import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { List } from "react-feather";
import IconButton from "./index";
import Clickable from "../Clickable";

describe("IconButton", () => {
    it("renders itself", () => {
        const component = shallow(<IconButton />);

        expect(component).to.be.present();
    });

    it("renders its icon", () => {
        const component = shallow(<IconButton icon={List} />);

        expect(component).to.have.exactly(1).descendants(List);
    });

    it("wraps a clickable", () => {
        const component = shallow(<IconButton />);

        expect(component.children().type()).to.equal(Clickable);
    });
});
