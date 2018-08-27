import { expect } from "chai";
import { fromJS, List } from "immutable";
import actions from "./actions";
import reducer from "./reducers";

describe("tracks reducer", () => {
    it("handles SET_TRACKS", () => {
        const initialState = List();
        const action = actions.setTracks([
            {
                id: "a",
                title: "Believa",
                artist: "Raelee Nikole",
                album: "Answers",
                duration: 243,
            },
            {
                id: "b",
                title: "Pumped Up Kicks",
                artist: "Foster The People",
                album: "Torches",
                duration: 240,
            },
        ]);
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS([
            {
                id: "a",
                title: "Believa",
                artist: "Raelee Nikole",
                album: "Answers",
                duration: 243,
            },
            {
                id: "b",
                title: "Pumped Up Kicks",
                artist: "Foster The People",
                album: "Torches",
                duration: 240,
            },
        ]));
    });

    it("handles SET_TRACKS without initial state", () => {
        const action = actions.setTracks([
            {
                id: "a",
                title: "Believa",
                artist: "Raelee Nikole",
                album: "Answers",
                duration: 243,
            },
        ]);
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS([
            {
                id: "a",
                title: "Believa",
                artist: "Raelee Nikole",
                album: "Answers",
                duration: 243,
            },
        ]));
    });
});
