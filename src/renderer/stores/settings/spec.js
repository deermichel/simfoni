import { expect } from "chai";
import { fromJS, Set } from "immutable";
import actions from "./actions";
import reducer from "./reducers";

describe("settings reducer", () => {
    it("has an initial state", () => {
        const nextState = reducer(undefined, {});

        expect(nextState).to.equal(fromJS({
            searchPaths: Set(),
        }));
    });

    it("handles ADD_SEARCH_PATHS", () => {
        const initialState = fromJS({
            searchPaths: ["a", "b", "c"],
        });
        const action = actions.addSearchPaths(["d", "e"]);
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            searchPaths: ["a", "b", "c", "d", "e"],
        }));
    });

    it("handles REMOVE_SEARCH_PATH", () => {
        const initialState = fromJS({
            searchPaths: ["a", "b", "c"],
        });
        const action = actions.removeSearchPath("b");
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            searchPaths: ["a", "c"],
        }));
    });
});
