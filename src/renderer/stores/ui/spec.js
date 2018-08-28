import { expect } from "chai";
import { fromJS } from "immutable";
import actions from "./actions";
import reducer from "./reducers";

describe("ui reducer", () => {
    it("has an initial state", () => {
        const nextState = reducer(undefined, {});

        expect(nextState).to.equal(fromJS({
            showMenu: false,
        }));
    });

    it("handles TOGGLE_MENU", () => {
        const initialState = fromJS({
            showMenu: true,
        });
        const action = actions.toggleMenu();
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            showMenu: false,
        }));
    });
});
