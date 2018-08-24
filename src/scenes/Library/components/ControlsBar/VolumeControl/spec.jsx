import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import VolumeControl from "./index";

describe("VolumeControl", () => {
    const component = shallow(<VolumeControl />);

    expect(component).to.be.present();
});
