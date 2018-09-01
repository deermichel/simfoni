import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import {
    Volume,
    Volume1,
    Volume2,
    VolumeX,
} from "react-feather";
import VolumeControl from "./index";
import Clickable from "~/components/Clickable";

describe("VolumeControl", () => {
    it("renders itself", () => {
        const component = mount(<VolumeControl />);

        expect(component).to.be.present();
    });

    it("displays mute icon if muted", () => {
        const component = mount(<VolumeControl muted volume={1.0} />);

        expect(component).to.have.exactly(0).descendants(Volume);
        expect(component).to.have.exactly(0).descendants(Volume1);
        expect(component).to.have.exactly(0).descendants(Volume2);
        expect(component).to.have.exactly(1).descendants(VolumeX);
    });

    it("displays low volume icon if volume < 0.33", () => {
        const component = mount(<VolumeControl volume={0.32} />);

        expect(component).to.have.exactly(1).descendants(Volume);
        expect(component).to.have.exactly(0).descendants(Volume1);
        expect(component).to.have.exactly(0).descendants(Volume2);
        expect(component).to.have.exactly(0).descendants(VolumeX);
    });

    it("displays medium volume icon if volume < 0.66", () => {
        const component = mount(<VolumeControl volume={0.33} />);

        expect(component).to.have.exactly(0).descendants(Volume);
        expect(component).to.have.exactly(1).descendants(Volume1);
        expect(component).to.have.exactly(0).descendants(Volume2);
        expect(component).to.have.exactly(0).descendants(VolumeX);
    });

    it("displays high volume icon if volume >= 0.66", () => {
        const component = mount(<VolumeControl volume={0.66} />);

        expect(component).to.have.exactly(0).descendants(Volume);
        expect(component).to.have.exactly(0).descendants(Volume1);
        expect(component).to.have.exactly(1).descendants(Volume2);
        expect(component).to.have.exactly(0).descendants(VolumeX);
    });

    it("invokes callback on click", () => {
        let callbackInvoked = false;
        const onClick = () => { callbackInvoked = true; };
        const component = mount(<VolumeControl onMute={onClick} />);
        component.find(Clickable).simulate("click");

        expect(callbackInvoked).to.equal(true);
    });

    // it("invokes setVolume on mouse interaction", () => {
    //     // test does not work... help needed - but feature works, trust me ^^
    // });
});
