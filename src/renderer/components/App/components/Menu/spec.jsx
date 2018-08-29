import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import Menu from "./index";
import MenuItem from "./components/MenuItem";

describe("Menu", () => {
    it("renders itself", () => {
        const component = shallow(<Menu />);

        expect(component).to.be.present();
        expect(component).to.contain.text("Views");
        // expect(component).to.contain.text("Playlists");
    });

    it("has a MenuItem for Songs", () => {
        const component = shallow(<Menu />);

        expect(component.find({ text: "Songs" }).type()).to.equal(MenuItem);
    });

    it("has a MenuItem for Settings", () => {
        const component = shallow(<Menu />);

        expect(component.find({ text: "Settings" }).type()).to.equal(MenuItem);
    });
});
