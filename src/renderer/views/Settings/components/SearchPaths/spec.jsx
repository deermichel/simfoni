import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import SearchPaths from "./index";

describe("SearchPaths", () => {
    it("renders itself", () => {
        const component = shallow(<SearchPaths />);

        expect(component).to.be.present();
    });
});
