import types from "./types";
import orm from "./orm";

const INITIAL_STATE = orm.getEmptyState();

const updateTrack = (session, payload) => {
    const { Artist, Album, Track } = session;
    const { track } = payload;

    const saved = Track.withId(track.id);
    if (!saved) {
        return;
    }

    const updatedTrack = {
        title: track.title || saved.title,
        artist: track.artist || saved.album.artist.name,
        album: track.album || saved.album.name,
        duration: track.duration || saved.duration,
        uri: track.uri || saved.uri,
    };

    let artist = Artist.get({ name: updatedTrack.artist });
    if (!artist) {
        artist = Artist.create({ name: updatedTrack.artist });
    }

    let album = Album.get({ name: updatedTrack.album, artist: artist.id });
    if (!album) {
        album = Album.create({ name: updatedTrack.album, artist: artist.id });
    }

    if (track.coverart) {
        album.coverart = track.coverart;
    }

    saved.update({
        title: updatedTrack.title,
        duration: updatedTrack.duration,
        uri: updatedTrack.uri,
        album: album.id,
    });
};

const addTracks = (session, payload) => {
    const { Track } = session;

    payload.tracks.forEach((t) => {
        let saved = Track.get({ uri: t.uri });
        if (!saved) {
            saved = Track.create({ uri: t.uri });
        }
        const track = t;
        track.id = saved.id;
        updateTrack(session, { track });
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
