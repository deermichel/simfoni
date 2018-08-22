import { connect } from "react-redux";
import Library from "./ui";
import {
    nowPlayingOperations,
    nowPlayingSelectors,
} from "~/stores/nowPlaying";

const mapStateToProps = (state) => ({
    tracks: state.tracks,
    nowPlaying: nowPlayingSelectors.getNowPlayingWithTrack(state),
});

const mapDispatchToProps = (dispatch) => ({
    onPlayQueue: (queue) => dispatch(nowPlayingOperations.playQueue(queue)),
    onTogglePlayback: () => dispatch(nowPlayingOperations.togglePlayback()),
    onSkipForward: () => dispatch(nowPlayingOperations.skipForward()),
    onSkipBackward: () => dispatch(nowPlayingOperations.skipBackward()),
    onSeek: (time) => dispatch(nowPlayingOperations.seek(time)),
});

const LibraryContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Library);

export default LibraryContainer;
