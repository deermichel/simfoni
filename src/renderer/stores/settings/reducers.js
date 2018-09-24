import { Map } from "immutable";

const INITIAL_STATE = Map();

const settingsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default settingsReducer;
