import { connect } from "react-redux";
import Settings from "./ui";
import { settingsOperations } from "~/stores/settings";

const mapStateToProps = (state) => ({
    settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
    onAddSearchPaths: (paths) => dispatch(settingsOperations.addSearchPaths(paths)),
    onRemoveSearchPath: (path) => dispatch(settingsOperations.removeSearchPath(path)),
});

const SettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Settings);

export default SettingsContainer;
