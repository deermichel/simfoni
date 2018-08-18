import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import DurationBar from "./index";

describe("DurationBar", () => {
    it("renders itself", () => {
        const component = shallow(<DurationBar />);

        expect(component).to.be.present();
    });

    it("displays the current time", () => {
        const component = shallow(<DurationBar currentTime={63} />);

        expect(component).to.contain.text("1:03");
    });

    it("displays the total time", () => {
        const component = shallow(<DurationBar totalTime={32} />);

        expect(component).to.contain.text("0:32");
    });

    it("invokes seek callback on click", () => {
        let seekedTo = -1;
        const onSeek = (time) => { seekedTo = time; };
        const component = shallow(<DurationBar totalTime={100} onSeek={onSeek} />);
        component.simulate("click", {
            clientX: 50,
            target: {
                getBoundingClientRect: () => ({ left: 0, width: 200 }),
            },
        });

        expect(seekedTo).to.equal(25);
    });
});
