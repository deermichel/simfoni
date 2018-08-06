import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { fromJS } from "immutable";
import Track from "./index";

describe("Track", () => {
    const track = fromJS({
        title: "Believa",
        artist: "Raelee Nikole",
        album: "Answers",
        duration: 243, // 4:03
    });

    it("renders with correct class name", () => {
        const component = shallow(<Track />);

        expect(component).to.be.present();
        expect(component).to.have.className("track");
    });

    it("has a title field", () => {
        const component = shallow(<Track track={track} />);

        expect(component.find(".title")).to.be.present();
        expect(component.find(".title")).to.contain.text("Believa");
    });

    it("has an artist field", () => {
        const component = shallow(<Track track={track} />);

        expect(component.find(".artist")).to.be.present();
        expect(component.find(".artist")).to.contain.text("Raelee Nikole");
    });

    it("has an album field", () => {
        const component = shallow(<Track track={track} />);

        expect(component.find(".album")).to.be.present();
        expect(component.find(".album")).to.contain.text("Answers");
    });

    it("has a duration field", () => {
        const component = shallow(<Track track={track} />);

        expect(component.find(".duration")).to.be.present();
        expect(component.find(".duration")).to.contain.text("4:03");
    });
});
