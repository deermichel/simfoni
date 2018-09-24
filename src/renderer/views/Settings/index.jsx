import { connect } from "react-redux";
import Settings from "./ui";
import { settingsOperations } from "~/stores/settings";

const mapStateToProps = (state) => ({
    settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
    onImportFolders: (folders) => dispatch(settingsOperations.importFolders(folders)),
});

const SettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Settings);

export default SettingsContainer;
