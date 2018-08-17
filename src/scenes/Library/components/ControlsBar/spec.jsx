import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import ControlsBar from "./index";
import PlayButton from "./PlayButton";
import SkipButton, { SkipDirection } from "./SkipButton";
import DurationBar from "./DurationBar";

describe("ControlsBar", () => {
    it("renders itself", () => {
        const component = shallow(<ControlsBar />);

        expect(component).to.be.present();
    });

    it("contains one <PlayButton />", () => {
        const component = shallow(<ControlsBar />);

        expect(component).to.have.exactly(1).descendants(PlayButton);
        expect(component).to.contain(<PlayButton />);
    });

    it("contains one <SkipButton /> per skip direction (fwd, bwd)", () => {
        const component = shallow(<ControlsBar />);

        expect(component).to.have.exactly(2).descendants(SkipButton);
        expect(component).to.contain(<SkipButton direction={SkipDirection.FORWARD} />);
        expect(component).to.contain(<SkipButton direction={SkipDirection.BACKWARD} />);
    });

    it("contains one <DurationBar />", () => {
        const component = shallow(<ControlsBar />);

        expect(component).to.have.exactly(1).descendants(DurationBar);
        expect(component).to.contain(<DurationBar />);
    });
});
