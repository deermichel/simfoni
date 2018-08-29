import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import Settings from "./ui";
import SearchPaths from "./components/SearchPaths";

describe("Settings", () => {
    it("renders itself", () => {
        const component = shallow(<Settings />);

        expect(component).to.be.present();
    });

    it("contains one <SearchPaths />", () => {
        const component = shallow(<Settings />);

        expect(component).to.have.exactly(1).descendants(SearchPaths);
    });
});
