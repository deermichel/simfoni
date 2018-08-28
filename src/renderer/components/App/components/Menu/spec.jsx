import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import Menu from "./index";

describe("Menu", () => {
    it("renders itself", () => {
        const component = shallow(<Menu />);

        expect(component).to.be.present();
    });
});
