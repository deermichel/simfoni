import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import Library from "./ui";
import TrackList from "./components/TrackList";
import ControlsBar from "./components/ControlsBar";

describe("Library", () => {
    it("renders itself", () => {
        const component = shallow(<Library />);

        expect(component).to.be.present();
    });

    it("contains one <TrackList />", () => {
        const component = shallow(<Library />);

        expect(component).to.have.exactly(1).descendants(TrackList);
        // expect(component).to.contain(<TrackList />);
    });

    it("contains one <ControlsBar />", () => {
        const component = shallow(<Library />);

        expect(component).to.have.exactly(1).descendants(ControlsBar);
        // expect(component).to.contain(<ControlsBar />);
    });
});
