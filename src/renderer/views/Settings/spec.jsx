import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import Settings from "./ui";

describe("Songs", () => {
    it("renders itself", () => {
        const component = shallow(<Settings />);

        expect(component).to.be.present();
    });
});
