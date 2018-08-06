import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { fromJS } from "immutable";
import TrackList from "./ui";
import Track from "./Track";

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

    it("renders with correct class name", () => {
        const component = shallow(<TrackList />);

        expect(component).to.be.present();
        expect(component).to.have.className("trackList");
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
});
