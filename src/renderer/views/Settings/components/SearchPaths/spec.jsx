import React from "react";
import { shallow, mount } from "enzyme";
import { expect } from "chai";
import { Set } from "immutable";
import { Delete, Plus } from "react-feather";
import Clickable from "~/components/Clickable";
import IconButton from "~/components/IconButton";
import SearchPaths from "./index";

describe("SearchPaths", () => {
    it("renders itself", () => {
        const component = shallow(<SearchPaths />);

        expect(component).to.be.present();
    });

    it("displays the paths", () => {
        const paths = Set(["pathA", "pathB"]);
        const component = shallow(<SearchPaths paths={paths} />);

        expect(component).to.contain.text("pathA");
        expect(component).to.contain.text("pathB");
    });

    it("has a delete button for each path", () => {
        const removed = [];
        const paths = Set(["pathA", "pathB"]);
        const onRemove = (path) => removed.push(path);
        const component = mount(<SearchPaths paths={paths} onRemove={onRemove} />);

        expect(component.find({ icon: Delete })).to.have.lengthOf(2);

        component.find(IconButton).at(1).find(Clickable).simulate("click");
        expect(removed).to.include("pathA");

        component.find(IconButton).at(2).find(Clickable).simulate("click");
        expect(removed).to.include("pathB");
    });

    it("has one add button", () => {
        const component = shallow(<SearchPaths />);

        expect(component.find({ icon: Plus })).to.have.lengthOf(1);
        expect(component.find({ icon: Plus }).type()).to.equal(IconButton);
    });
});
