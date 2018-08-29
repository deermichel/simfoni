import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { Clock } from "react-feather";
import Header from "./index";

describe("TrackList/Header", () => {
    it("renders itself", () => {
        const component = shallow(<Header />);

        expect(component).to.be.present();
        expect(component).to.contain.text("Title");
        expect(component).to.contain.text("Artist");
        expect(component).to.contain.text("Album");
        expect(component).to.have.exactly(1).descendants(Clock);
    });
});
