import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { SkipForward, SkipBack } from "react-feather";
import SkipButton, { SkipDirection } from "./index";

describe("SkipButton", () => {
    it("renders with correct class name", () => {
        const component = shallow(<SkipButton />);

        expect(component).to.be.present();
        expect(component).to.have.className("skipButton");
    });

    it("displays no icon without direction prop", () => {
        const component = shallow(<SkipButton />);

        expect(component).to.have.exactly(0).descendants(SkipForward);
        expect(component).to.have.exactly(0).descendants(SkipBack);
        expect(component).to.be.blank();
    });

    it("displays a skip forward icon", () => {
        const component = shallow(<SkipButton direction={SkipDirection.FORWARD} />);

        expect(component).to.have.exactly(1).descendants(SkipForward);
        expect(component).to.have.exactly(0).descendants(SkipBack);
        expect(component).to.contain(<SkipForward />);
    });

    it("displays a skip backward icon", () => {
        const component = shallow(<SkipButton direction={SkipDirection.BACKWARD} />);

        expect(component).to.have.exactly(0).descendants(SkipForward);
        expect(component).to.have.exactly(1).descendants(SkipBack);
        expect(component).to.contain(<SkipBack />);
    });

    it("invokes callback on click", () => {
        let callbackInvoked = false;
        const onClick = () => { callbackInvoked = true; };
        const component = shallow(<SkipButton onSkip={onClick} />);
        component.simulate("click");

        expect(callbackInvoked).to.equal(true);
    });
});
