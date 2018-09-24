import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import Library from "./index";
import TextButton from "~/components/TextButton";

describe("Settings/Library", () => {
    it("renders itself", () => {
        const component = shallow(<Library />);

        expect(component).to.be.present();
    });

    it("has an import button", () => {
        const component = shallow(<Library />);

        expect(component.find({ text: "Import from" })).to.have.lengthOf(1);
        expect(component.find({ text: "Import from" }).type()).to.equal(TextButton);
    });
});
