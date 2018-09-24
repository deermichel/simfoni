import React from "react";
import { shallow, mount } from "enzyme";
import { expect } from "chai";
import { List } from "react-feather";
import TextButton from "./index";
import Clickable from "../Clickable";

describe("TextButton", () => {
    it("renders itself", () => {
        const component = shallow(<TextButton />);

        expect(component).to.be.present();
    });

    it("renders its icon", () => {
        const component = shallow(<TextButton icon={List} />);

        expect(component).to.have.exactly(1).descendants(List);
    });

    it("renders its text", () => {
        const component = mount(<TextButton text="Hello Button" />);

        expect(component).to.contain.text("Hello Button");
    });

    it("wraps a clickable", () => {
        const component = shallow(<TextButton />);

        expect(component.children().type()).to.equal(Clickable);
    });
});
