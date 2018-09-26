import { expect } from "chai";
import { fromJS } from "immutable";
import reducer from "./reducers";
import operations from "./operations";
import libraryTypes from "../library/types";

describe("settings reducer", () => {
    it("has an initial state", () => {
        const nextState = reducer(undefined, {});

        expect(nextState).to.equal(fromJS({}));
    });
});

describe("settings operations", () => {
    describe("importFolders", () => {
        it("imports tracks using ADD_TRACKS action", () => new Promise((resolve) => {
            operations.importFolders(["./test"])((action) => {
                expect(action.type).to.equal(libraryTypes.ADD_TRACKS);
                const { tracks } = action.payload;
                expect(tracks.length).to.equal(1);
                expect(tracks[0]).to.deep.equal({
                    title: "Space #adamaudio #moon",
                    artist: "Micha Hanselmann",
                    album: "ADAM Audio Contest",
                    duration: 31,
                    uri: "file://test/Space.mp3",
                });
                resolve();
            });
        }));
    });
});
