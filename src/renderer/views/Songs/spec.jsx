import React from "react";
import { shallow } from "enzyme";
import { fromJS } from "immutable";
import { expect } from "chai";
import { Play } from "react-feather";
import Songs from "./ui";
import TrackList from "./components/TrackList";
import PlayState from "~/constants/PlayState";

describe("Songs", () => {
    it("renders itself", () => {
        const component = shallow(<Songs />);

        expect(component).to.be.present();
    });

    it("contains one <TrackList />", () => {
        const component = shallow(<Songs />);

        expect(component).to.have.exactly(1).descendants(TrackList);
    });

    it("displays play icon next to current track", () => {
        const nowPlaying = fromJS({
            playState: PlayState.PLAYING,
            currentTrack: { id: "a" },
        });
        const component = shallow(<Songs nowPlaying={nowPlaying} />);

        expect(component.find(TrackList).prop("icons").toJS()).to.deep.equal({
            a: <Play size={16} />,
        });
    });
});
