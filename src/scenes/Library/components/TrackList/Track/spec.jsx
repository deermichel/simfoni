import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { fromJS } from "immutable";
import { Play } from "react-feather";
import Track from "./index";

describe("Track", () => {
    const track = fromJS({
        title: "Believa",
        artist: "Raelee Nikole",
        album: "Answers",
        duration: 243, // 4:03
    });

    it("renders itself", () => {
        const component = shallow(<Track />);

        expect(component).to.be.present();
    });

    it("displays the icon", () => {
        const component = shallow(<Track track={track} icon={<Play />} />);

        expect(component).to.have.exactly(1).descendants(Play);
    });

    it("displays the title", () => {
        const component = shallow(<Track track={track} />);

        expect(component).to.contain.text("Believa");
    });

    it("displays the artist", () => {
        const component = shallow(<Track track={track} />);

        expect(component).to.contain.text("Raelee Nikole");
    });

    it("displays the album", () => {
        const component = shallow(<Track track={track} />);

        expect(component).to.contain.text("Answers");
    });

    it("displays the duration", () => {
        const component = shallow(<Track track={track} />);

        expect(component).to.contain.text("4:03");
    });
});
