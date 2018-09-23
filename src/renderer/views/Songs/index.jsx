import { connect } from "react-redux";
import Songs from "./ui";
import { librarySelectors } from "~/stores/library";
import {
    nowPlayingOperations,
    nowPlayingSelectors,
} from "~/stores/nowPlaying";

const mapStateToProps = (state) => ({
    tracks: librarySelectors.getTracks(state),
    nowPlaying: nowPlayingSelectors.getNowPlayingWithTrack(state),
});

const mapDispatchToProps = (dispatch) => ({
    onPlayQueue: (queue, history) => dispatch(nowPlayingOperations.playQueue(queue, history)),
    onTogglePlayback: () => dispatch(nowPlayingOperations.togglePlayback()),
    onSkipForward: () => dispatch(nowPlayingOperations.skipForward()),
    onSkipBackward: () => dispatch(nowPlayingOperations.skipBackward()),
    onSeek: (time) => dispatch(nowPlayingOperations.seek(time)),
    onMute: () => dispatch(nowPlayingOperations.toggleMute()),
    onSetVolume: (volume) => dispatch(nowPlayingOperations.setVolume(volume)),
});

const SongsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Songs);

export default SongsContainer;
