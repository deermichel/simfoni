import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import { SkipForward, SkipBack } from "react-feather";
import SkipButton, { SkipDirection } from "./index";
import Clickable from "~/components/Clickable";

describe("SkipButton", () => {
    it("renders itself", () => {
        const component = mount(<SkipButton />);

        expect(component).to.be.present();
    });

    it("displays a skip forward icon by default", () => {
        const component = mount(<SkipButton />);

        expect(component).to.have.exactly(1).descendants(SkipForward);
        expect(component).to.have.exactly(0).descendants(SkipBack);
    });

    it("displays a skip backward icon", () => {
        const component = mount(<SkipButton direction={SkipDirection.BACKWARD} />);

        expect(component).to.have.exactly(0).descendants(SkipForward);
        expect(component).to.have.exactly(1).descendants(SkipBack);
    });

    it("invokes callback on click", () => {
        let callbackInvoked = false;
        const onClick = () => { callbackInvoked = true; };
        const component = mount(<SkipButton onSkip={onClick} />);
        component.find(Clickable).simulate("click");

        expect(callbackInvoked).to.equal(true);
    });

    it("disables button when disabled", () => {
        const component = mount(<SkipButton disabled />);

        expect(component.find(Clickable).prop("disabled")).to.equal(true);
    });
});
