import { connect } from "react-redux";
import App from "./ui";
import {
    nowPlayingOperations,
    nowPlayingSelectors,
} from "~/stores/nowPlaying";
import { uiOperations } from "~/stores/ui";

const mapStateToProps = (state) => ({
    tracks: state.tracks,
    nowPlaying: nowPlayingSelectors.getNowPlayingWithTrack(state),
    ui: state.ui,
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
});

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default AppContainer;
