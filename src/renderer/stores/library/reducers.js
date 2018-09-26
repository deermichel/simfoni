import types from "./types";
import orm from "./orm";

const INITIAL_STATE = orm.getEmptyState();

const updateTrack = (session, payload) => {
    const { Artist, Album, Track } = session;
    let { track } = payload;

    const saved = Track.withId(track.id);
    if (!saved) {
        return;
    }
    track = {
        title: track.title || saved.title,
        artist: track.artist || saved.album.artist.name,
        album: track.album || saved.album.name,
        duration: track.duration || saved.duration,
        uri: track.uri || saved.uri,
    };

    let artist = Artist.get({ name: track.artist });
    if (!artist) {
        artist = Artist.create({ name: track.artist });
    }

    let album = Album.get({ name: track.album, artist: artist.id });
    if (!album) {
        album = Album.create({ name: track.album, artist: artist.id });
    }

    saved.update({
        title: track.title,
        duration: track.duration,
        uri: track.uri,
        album: album.id,
    });
};

const addTracks = (session, payload) => {
    const { Track } = session;

    payload.tracks.forEach((track) => {
        let saved = Track.get({ uri: track.uri });
        if (!saved) {
            saved = Track.create({ uri: track.uri });
        }
        updateTrack(session, { track: { id: saved.id, ...track } });
    });
};

const libraryReducer = (state = INITIAL_STATE, action) => {
    const session = orm.session(state);

    switch (action.type) {
        case types.ADD_TRACKS:
            addTracks(session, action.payload);
            break;
        case types.UPDATE_TRACK:
            updateTrack(session, action.payload);
            break;
        default:
            break;
    }

    return session.state;
};

export default libraryReducer;
