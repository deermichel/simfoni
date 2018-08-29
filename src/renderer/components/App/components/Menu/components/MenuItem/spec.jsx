import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { List } from "react-feather";
import MenuItem from "./index";

describe("MenuItem", () => {
    it("renders itself", () => {
        const component = shallow(<MenuItem />);

        expect(component).to.be.present();
    });

    it("displays its text", () => {
        const component = shallow(<MenuItem text="Hello Item" />);

        expect(component).to.contain.text("Hello Item");
    });

    it("displays its icon", () => {
        const component = shallow(<MenuItem icon={<List />} />);

        expect(component).to.have.exactly(1).descendants(List);
    });
});
