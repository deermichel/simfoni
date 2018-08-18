import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import DurationBar from "./index";

describe("DurationBar", () => {
    it("renders itself", () => {
        const component = shallow(<DurationBar />);

        expect(component).to.be.present();
    });

    it("displays the current time", () => {
        const component = shallow(<DurationBar currentTime={63} />);

        expect(component).to.contain.text("1:03");
    });

    it("displays the total time", () => {
        const component = shallow(<DurationBar totalTime={32} />);

        expect(component).to.contain.text("0:32");
    });
});
