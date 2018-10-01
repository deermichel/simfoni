import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import VinylBackground from "./index";

describe("VinylBackground", () => {
    it("renders itself", () => {
        const component = shallow(<VinylBackground />);

        expect(component).to.be.present();
    });

    it("displays the background image", () => {
        const component = shallow(<VinylBackground imageUrl="url" />);

        expect(component).to.have.exactly(1).descendants("img");
        expect(component.find("img")).to.have.prop("src", "url");
    });
});
