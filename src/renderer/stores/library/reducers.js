import types from "./types";
import orm from "./orm";

const INITIAL_STATE = orm.getEmptyState();

const addTrack = (session, payload) => {
    const { Artist, Album, Track } = session;

    let artist = Artist.get({ name: payload.track.artist });
    if (!artist) {
        artist = Artist.create({ name: payload.track.artist });
    }

    let album = Album.get({ name: payload.track.album, artist: artist.id });
    if (!album) {
        album = Album.create({ name: payload.track.album, artist: artist.id });
    }

    if (!Track.exists({ uri: payload.track.uri })) {
        Track.create({
            title: payload.track.title,
            duration: payload.track.duration,
            uri: payload.track.uri,
            album: album.id,
        });
    }
};

const libraryReducer = (state = INITIAL_STATE, action) => {
    const session = orm.session(state);

    switch (action.type) {
        case types.ADD_TRACK:
            addTrack(session, action.payload);
            break;
        default:
            break;
    }

    return session.state;
};

export default libraryReducer;
