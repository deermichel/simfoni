import React from "react";
import { shallow } from "enzyme";
import { fromJS } from "immutable";
import { expect } from "chai";
import { Play } from "react-feather";
import Library from "./ui";
import TrackList from "./components/TrackList";
import ControlsBar from "./components/ControlsBar";
import PlayState from "~/constants/PlayState";

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

    it("displays play icon next to current track", () => {
        const nowPlaying = fromJS({
            playState: PlayState.PLAYING,
            currentTrack: { id: "a" },
        });
        const component = shallow(<Library nowPlaying={nowPlaying} />);

        expect(component.find(TrackList).prop("icons").toJS()).to.deep.equal({
            a: <Play size={16} />,
        });
    });
});
