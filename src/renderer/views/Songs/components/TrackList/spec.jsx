import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { fromJS } from "immutable";
import { Play, Pause } from "react-feather";
import TrackList from "./index";
import Track from "./components/Track";
import Header from "./components/Header";
import Clickable from "~/components/Clickable";

describe("TrackList", () => {
    const tracks = fromJS([
        {
            id: "a",
            title: "Believa",
            artist: "Raelee Nikole",
            album: "Answers",
            duration: 243, // 4:03
        },
        {
            id: "b",
            title: "Pumped Up Kicks",
            artist: "Foster The People",
            album: "Torches",
            duration: 240, // 4:00
        },
        {
            id: "c",
            title: "No Diggity",
            artist: "Chet Faker",
            album: "Digging the Blogosphere",
            duration: 226, // 3:46
        },
    ]);

    it("renders itself", () => {
        const component = shallow(<TrackList />);

        expect(component).to.be.present();
    });

    it("contains one <Header />", () => {
        const component = shallow(<TrackList />);

        expect(component).to.have.exactly(1).descendants(Header);
        expect(component).to.contain(<Header />);
    });

    it("contains one <Track /> child per track", () => {
        const component = shallow(<TrackList tracks={tracks} />);

        expect(component).to.have.exactly(3).descendants(Track);
        expect(component).to.contain(<Track
            track={fromJS({
                id: "a",
                title: "Believa",
                artist: "Raelee Nikole",
                album: "Answers",
                duration: 243, // 4:03
            })}
        />);
        expect(component).to.contain(<Track
            track={fromJS({
                id: "b",
                title: "Pumped Up Kicks",
                artist: "Foster The People",
                album: "Torches",
                duration: 240, // 4:00
            })}
        />);
        expect(component).to.contain(<Track
            track={fromJS({
                id: "c",
                title: "No Diggity",
                artist: "Chet Faker",
                album: "Digging the Blogosphere",
                duration: 226, // 3:46
            })}
        />);
    });

    it("invokes onClickTrack callback with correct trackId on click", () => {
        let clickedId;
        const onClickTrack = (trackId) => { clickedId = trackId; };
        const component = shallow(<TrackList tracks={tracks} onClickTrack={onClickTrack} />);
        component.find(Clickable).first().simulate("click");

        expect(component).to.have.exactly(3).descendants(Clickable);
        expect(clickedId).to.equal("a");
    });

    it("displays the icons", () => {
        const icons = fromJS({ a: <Play />, b: <Pause /> });
        const component = shallow(<TrackList tracks={tracks} icons={icons} />);

        expect(component.find(Track).at(0).prop("icon")).to.equal(fromJS(<Play />));
        expect(component.find(Track).at(1).prop("icon")).to.equal(fromJS(<Pause />));
        expect(component.find(Track).at(2).prop("icon")).to.equal(null);
    });
});
