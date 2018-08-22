import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { SkipForward, SkipBack } from "react-feather";
import SkipButton, { SkipDirection } from "./index";
import Button from "~/components/Button";

describe("SkipButton", () => {
    it("renders itself", () => {
        const component = shallow(<SkipButton />);

        expect(component).to.be.present();
    });

    it("displays no icon without direction prop", () => {
        const component = shallow(<SkipButton />);

        expect(component).to.have.exactly(0).descendants(SkipForward);
        expect(component).to.have.exactly(0).descendants(SkipBack);
    });

    it("displays a skip forward icon", () => {
        const component = shallow(<SkipButton direction={SkipDirection.FORWARD} />);

        expect(component).to.have.exactly(1).descendants(SkipForward);
        expect(component).to.have.exactly(0).descendants(SkipBack);
    });

    it("displays a skip backward icon", () => {
        const component = shallow(<SkipButton direction={SkipDirection.BACKWARD} />);

        expect(component).to.have.exactly(0).descendants(SkipForward);
        expect(component).to.have.exactly(1).descendants(SkipBack);
    });

    it("invokes callback on click", () => {
        let callbackInvoked = false;
        const onClick = () => { callbackInvoked = true; };
        const component = shallow(<SkipButton onSkip={onClick} />);
        component.find(Button).simulate("click");

        expect(callbackInvoked).to.equal(true);
    });
});
