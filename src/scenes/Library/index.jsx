import { connect } from "react-redux";
import Library from "./ui";
import { nowPlayingOperations } from "~/stores/nowPlaying";

const mapStateToProps = (state) => ({
    tracks: state.tracks,
});

const mapDispatchToProps = (dispatch) => ({
    onPlayTrack: (trackId) => dispatch(nowPlayingOperations.playTrack(trackId)),
});

const LibraryContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Library);

export default LibraryContainer;
