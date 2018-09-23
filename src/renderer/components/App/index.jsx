import { connect } from "react-redux";
import { push } from "connected-react-router";
import App from "./ui";
import {
    nowPlayingOperations,
    nowPlayingSelectors,
} from "~/stores/nowPlaying";
import { librarySelectors } from "~/stores/library";
import { uiOperations } from "~/stores/ui";
import Views from "~/constants/Views";

const mapStateToProps = (state) => ({
    tracks: librarySelectors.getTracks(state),
    nowPlaying: nowPlayingSelectors.getNowPlayingWithTrack(state),
    ui: state.ui,
    location: state.router.location,
});

const mapDispatchToProps = (dispatch) => ({
    onPlayQueue: (queue, history) => dispatch(nowPlayingOperations.playQueue(queue, history)),
    onTogglePlayback: () => dispatch(nowPlayingOperations.togglePlayback()),
    onSkipForward: () => dispatch(nowPlayingOperations.skipForward()),
    onSkipBackward: () => dispatch(nowPlayingOperations.skipBackward()),
    onSeek: (time) => dispatch(nowPlayingOperations.seek(time)),
    onMute: () => dispatch(nowPlayingOperations.toggleMute()),
    onSetVolume: (volume) => dispatch(nowPlayingOperations.setVolume(volume)),
    onToggleMenu: () => dispatch(uiOperations.toggleMenu()),
    onNavigate: {
        artists: () => dispatch(push(Views.ARTISTS)),
        albums: () => dispatch(push(Views.ALBUMS)),
        songs: () => dispatch(push(Views.SONGS)),
        settings: () => dispatch(push(Views.SETTINGS)),
    },
});

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default AppContainer;
