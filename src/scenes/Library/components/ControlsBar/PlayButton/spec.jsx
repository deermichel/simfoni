import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { Play, Pause } from "react-feather";
import PlayButton from "./index";
import Button from "~/components/Button";

describe("PlayButton", () => {
    it("renders itself", () => {
        const component = shallow(<PlayButton />);

        expect(component).to.be.present();
    });

    it("displays a play icon", () => {
        const component = shallow(<PlayButton />);

        expect(component).to.have.exactly(1).descendants(Play);
        expect(component).to.have.exactly(0).descendants(Pause);
    });

    it("displays a pause icon when playing", () => {
        const component = shallow(<PlayButton playing />);

        expect(component).to.have.exactly(0).descendants(Play);
        expect(component).to.have.exactly(1).descendants(Pause);
    });

    it("invokes callback on click", () => {
        let callbackInvoked = false;
        const onClick = () => { callbackInvoked = true; };
        const component = shallow(<PlayButton onPlay={onClick} />);
        component.find(Button).simulate("click");

        expect(callbackInvoked).to.equal(true);
    });
});
