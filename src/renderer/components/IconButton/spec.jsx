import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { MoreVertical } from "react-feather";
import IconButton from "./index";
import Button from "~/components/Button";

describe("IconButton", () => {
    it("renders itself", () => {
        const component = shallow(<IconButton />);

        expect(component).to.be.present();
    });

    it("displays its icon", () => {
        const component = shallow(<IconButton icon={<MoreVertical />} />);

        expect(component).to.have.exactly(1).descendants(MoreVertical);
    });

    it("invokes callback on click", () => {
        let callbackInvoked = false;
        const onClick = () => { callbackInvoked = true; };
        const component = shallow(<IconButton onClick={onClick} />);
        component.find(Button).simulate("click");

        expect(callbackInvoked).to.equal(true);
    });
});
