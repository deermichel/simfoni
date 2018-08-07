import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Library from "./scenes/Library";

const app = (
    <App>
        <Library />
    </App>
);

ReactDOM.render(app, document.getElementById("root"));

if (module.hot) {
    module.hot.accept();
}
