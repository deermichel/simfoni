import React from "react";
import { render, mount } from "enzyme";
import { expect } from "chai";
import VolumeControl from "./index";
import Button from "~/components/Button";

describe("VolumeControl", () => {
    it("renders itself", () => {
        const component = render(<VolumeControl />);

        expect(component).to.be.present();
    });

    it("invokes callback on click", () => {
        let callbackInvoked = false;
        const onClick = () => { callbackInvoked = true; };
        const component = mount(<VolumeControl onMute={onClick} />);
        component.find(Button).simulate("click");

        expect(callbackInvoked).to.equal(true);
    });
});
