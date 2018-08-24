import React from "react";
import { render } from "enzyme";
import { expect } from "chai";
import VolumeControl from "./index";

describe("VolumeControl", () => {
    const component = render(<VolumeControl />);

    expect(component).to.be.present();
});
