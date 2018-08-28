import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { MoreVertical } from "react-feather";
import MenuButton from "./index";
import Button from "~/components/Button";

describe("MenuButton", () => {
    it("renders itself", () => {
        const component = shallow(<MenuButton />);

        expect(component).to.be.present();
    });

    it("displays its icon", () => {
        const component = shallow(<MenuButton />);

        expect(component).to.have.exactly(1).descendants(MoreVertical);
    });

    it("invokes callback on click", () => {
        let callbackInvoked = false;
        const onClick = () => { callbackInvoked = true; };
        const component = shallow(<MenuButton onShowMenu={onClick} />);
        component.find(Button).simulate("click");

        expect(callbackInvoked).to.equal(true);
    });
});
