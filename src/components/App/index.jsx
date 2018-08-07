import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    children: PropTypes.node,
};
const defaultProps = {
    children: null,
};

const App = ({ children }) => (
    <div className="app">
        {children}
    </div>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
