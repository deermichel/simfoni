import { expect } from "chai";
import actions from "./actions";
import selectors from "./selectors";
import reducer from "./reducers";
import orm from "./orm";

const getPreState = () => {
    const session = orm.session(orm.getEmptyState());

    const artist = session.Artist.create({ name: "Ben Rector" });
    const album = session.Album.create({ name: "Magic", artist: artist.id });
    session.Track.create({
        title: "I Will Always Be Yours",
        duration: 228,
        uri: "iwill.mp3",
        album: album.id,
    });

    return session.state;
};

describe("library reducer", () => {
    it("has an initial state", () => {
        const nextState = reducer(undefined, {});
        const { Artist, Album, Track } = orm.session(nextState);

        expect(nextState).to.deep.equal(orm.getEmptyState());
        expect(Artist.all().count()).to.equal(0);
        expect(Album.all().count()).to.equal(0);
        expect(Track.all().count()).to.equal(0);
    });

    it("handles ADD_TRACKS", () => {
        const tracks = [
            {
                title: "Dreams",
                artist: "Beck",
                album: "Colors",
                duration: 315,
                uri: "dreams.mp3",
            },
            {
                title: "Drive",
                artist: "Ben Rector",
                album: "Magic",
                duration: 198,
                uri: "drive.mp3",
            },
            {
                title: "Way I Am",
                artist: "Ben Rector",
                album: "Something Like This",
                duration: 249,
                uri: "way.mp3",
            },
        ];
        const nextState = reducer(getPreState(), actions.addTracks(tracks));
        const { Artist, Album, Track } = orm.session(nextState);

        expect(Artist.all().count()).to.equal(2);
        expect(Album.all().count()).to.equal(3);
        expect(Track.all().count()).to.equal(4);

        expect(Artist.exists({ name: "Beck" })).to.equal(true);
        expect(Album.exists({ name: "Something Like This" })).to.equal(true);
        expect(Artist.get({ name: "Ben Rector" }).id).to.equal(Album.get({ name: "Magic" }).artist.id);
        expect(Track.get({ title: "Drive" }).album.id).to.equal(Album.get({ name: "Magic" }).id);
        const way = Track.get({ title: "Way I Am" });
        expect(way.duration).to.equal(249);
        expect(way.uri).to.equal("way.mp3");
    });
});

describe("library selectors", () => {
    describe("getTracks", () => {
        it("returns array of full track objects", () => {
            const selected = selectors.getTracks({ library: getPreState() });

            expect(selected.length).to.be.equal(1);
            expect(selected[0]).to.have.property("id");
            expect(selected).to.deep.equal([
                {
                    title: "I Will Always Be Yours",
                    duration: 228,
                    uri: "iwill.mp3",
                    album: "Magic",
                    artist: "Ben Rector",
                    id: selected[0].id,
                },
            ]);
        });
    });
});
