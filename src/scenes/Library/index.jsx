import { connect } from "react-redux";
import Library from "./ui";

const mapStateToProps = (state) => ({
    tracks: state.tracks,
});

const LibraryContainer = connect(
    mapStateToProps,
)(Library);

export default LibraryContainer;
