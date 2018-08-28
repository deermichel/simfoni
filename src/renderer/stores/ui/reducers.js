import { Map } from "immutable";
import types from "./types";

const INITIAL_STATE = Map({
    showMenu: false,
});

const toggleMenu = (state) => state.set("showMenu", !state.get("showMenu"));

const uiReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.TOGGLE_MENU:
            return toggleMenu(state, action.payload);
        default:
            return state;
    }
};

export default uiReducer;
