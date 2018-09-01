import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import { Play, Pause } from "react-feather";
import PlayButton, { PlayWithMargin } from "./index";
import Clickable from "~/components/Clickable";

describe("PlayButton", () => {
    it("renders itself", () => {
        const component = mount(<PlayButton />);

        expect(component).to.be.present();
    });

    it("displays a play icon", () => {
        const component = mount(<PlayButton />);
        const icon = mount(<PlayWithMargin />);

        expect(icon).to.have.exactly(1).descendants(Play);
        expect(component).to.have.exactly(1).descendants(PlayWithMargin);
        expect(component).to.have.exactly(0).descendants(Pause);
    });

    it("displays a pause icon when playing", () => {
        const component = mount(<PlayButton playing />);

        expect(component).to.have.exactly(0).descendants(PlayWithMargin);
        expect(component).to.have.exactly(1).descendants(Pause);
    });

    it("invokes callback on click", () => {
        let callbackInvoked = false;
        const onClick = () => { callbackInvoked = true; };
        const component = mount(<PlayButton onPlay={onClick} />);
        component.find(Clickable).simulate("click");

        expect(callbackInvoked).to.equal(true);
    });
});
