import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { List } from "react-feather";
import IconButton, { ButtonSize } from "./index";
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

    it("renders different icon sizes", () => {
        const small = shallow(<IconButton size={ButtonSize.SMALL} icon={List} />);
        const medium = shallow(<IconButton size={ButtonSize.MEDIUM} icon={List} />);
        const large = shallow(<IconButton size={ButtonSize.LARGE} icon={List} />);

        expect(small.find(List).prop("size")).to.equal(ButtonSize.SMALL.iconSize);
        expect(medium.find(List).prop("size")).to.equal(ButtonSize.MEDIUM.iconSize);
        expect(large.find(List).prop("size")).to.equal(ButtonSize.LARGE.iconSize);
    });
});
