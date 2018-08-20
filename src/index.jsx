import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import Library from "./scenes/Library";
import configureStore from "./stores/configureStore";

const store = configureStore();

const app = (
    <Provider store={store}>
        <App>
            <Library />
        </App>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

if (module.hot) {
    module.hot.accept();
}
