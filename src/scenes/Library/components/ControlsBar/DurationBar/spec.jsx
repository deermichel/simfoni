import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import DurationBar from "./index";

describe("DurationBar", () => {
    it("renders itself", () => {
        const component = shallow(<DurationBar />);

        expect(component).to.be.present();
    });
});
