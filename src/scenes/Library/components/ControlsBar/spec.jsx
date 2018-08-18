import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { fromJS } from "immutable";
import ControlsBar from "./index";
import PlayButton from "./PlayButton";
import SkipButton from "./SkipButton";
import DurationBar from "./DurationBar";
import PlayState from "~/constants/PlayState";
import ScrollingText from "~/components/ScrollingText";

describe("ControlsBar", () => {
    const nowPlaying = fromJS({
        track: {
            id: "a",
            title: "Believa",
            artist: "Raelee Nikole",
            album: "Answers",
            duration: 243,
        },
        currentTime: 203,
        state: PlayState.PLAYING,
    });

    it("renders itself", () => {
        const component = shallow(<ControlsBar />);

        expect(component).to.be.present();
    });

    it("contains one <PlayButton />", () => {
        const component = shallow(<ControlsBar />);

        expect(component).to.have.exactly(1).descendants(PlayButton);
    });

    it("contains one <SkipButton /> per skip direction (fwd, bwd)", () => {
        const component = shallow(<ControlsBar />);

        expect(component).to.have.exactly(2).descendants(SkipButton);
    });

    it("contains one <DurationBar />", () => {
        const component = shallow(<ControlsBar />);

        expect(component).to.have.exactly(1).descendants(DurationBar);
    });

    it("displays the current title and artist", () => {
        const component = shallow(<ControlsBar nowPlaying={nowPlaying} />);

        expect(component).to.contain(<ScrollingText text="Believa" />);
        expect(component).to.contain(<ScrollingText text="Raelee Nikole" />);
    });

    it("reflects the current play state", () => {
        const component = shallow(<ControlsBar nowPlaying={nowPlaying} />);

        expect(component.find(PlayButton)).to.have.prop("playing", true);
    });
});
