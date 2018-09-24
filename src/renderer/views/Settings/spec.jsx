import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import Settings from "./ui";
import Library from "./components/Library";

describe("Settings", () => {
    it("renders itself", () => {
        const component = shallow(<Settings />);

        expect(component).to.be.present();
    });

    it("contains one <Library />", () => {
        const component = shallow(<Settings />);

        expect(component).to.have.exactly(1).descendants(Library);
    });
});
