import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import ScrollingText from "./index";

describe("ScrollingText", () => {
    it("renders itself", () => {
        const component = shallow(<ScrollingText />);

        expect(component).to.be.present();
    });

    it("displays the text", () => {
        const component = shallow(<ScrollingText text="Hello World" />);

        expect(component).to.contain.text("Hello World");
    });
});
