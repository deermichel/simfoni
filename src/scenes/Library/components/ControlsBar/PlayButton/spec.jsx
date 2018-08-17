import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { Play } from "react-feather";
import PlayButton from "./index";

describe("PlayButton", () => {
    it("renders with correct class name", () => {
        const component = shallow(<PlayButton />);

        expect(component).to.be.present();
        expect(component).to.have.className("playButton");
    });

    it("displays a play icon", () => {
        const component = shallow(<PlayButton />);

        expect(component).to.have.exactly(1).descendants(Play);
    });

    it("invokes callback on click", () => {
        let callbackInvoked = false;
        const onClick = () => { callbackInvoked = true; };
        const component = shallow(<PlayButton onPlay={onClick} />);
        component.simulate("click");

        expect(callbackInvoked).to.equal(true);
    });
});
