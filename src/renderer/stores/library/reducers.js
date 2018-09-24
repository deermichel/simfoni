import types from "./types";
import orm from "./orm";

const INITIAL_STATE = orm.getEmptyState();

const addTracks = (session, payload) => {
    const { Artist, Album, Track } = session;

    payload.tracks.forEach((track) => {
        if (Track.exists({ uri: track.uri })) {
            return;
        }

        let artist = Artist.get({ name: track.artist });
        if (!artist) {
            artist = Artist.create({ name: track.artist });
        }

        let album = Album.get({ name: track.album, artist: artist.id });
        if (!album) {
            album = Album.create({ name: track.album, artist: artist.id });
        }

        Track.create({
            title: track.title,
            duration: track.duration,
            uri: track.uri,
            album: album.id,
        });
    });
};

const libraryReducer = (state = INITIAL_STATE, action) => {
    const session = orm.session(state);

    switch (action.type) {
        case types.ADD_TRACKS:
            addTracks(session, action.payload);
            break;
        default:
            break;
    }

    return session.state;
};

export default libraryReducer;
