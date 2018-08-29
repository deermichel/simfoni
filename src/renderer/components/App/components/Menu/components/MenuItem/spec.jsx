import React from "react";
import { shallow, mount } from "enzyme";
import { expect } from "chai";
import { List } from "react-feather";
import MenuItem from "./index";
import Button from "~/components/Button";

describe("MenuItem", () => {
    it("renders itself", () => {
        const component = shallow(<MenuItem />);

        expect(component).to.be.present();
    });

    it("displays its text", () => {
        const component = mount(<MenuItem text="Hello Item" />);

        expect(component).to.contain.text("Hello Item");
    });

    it("displays its icon", () => {
        const component = shallow(<MenuItem icon={<List />} />);

        expect(component).to.have.exactly(1).descendants(List);
    });

    it("invokes callback on click", () => {
        let callbackInvoked = false;
        const onClick = () => { callbackInvoked = true; };
        const component = shallow(<MenuItem onClick={onClick} />);
        component.find(Button).simulate("click");

        expect(callbackInvoked).to.equal(true);
    });
});
