import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import App from "./ui";
import ControlsBar from "./components/ControlsBar";
import Menu from "./components/Menu";

describe("App", () => {
    it("renders itself", () => {
        const component = shallow(<App />);

        expect(component).to.be.present();
    });

    it("contains one <ControlsBar />", () => {
        const component = shallow(<App />);

        expect(component).to.have.exactly(1).descendants(ControlsBar);
    });

    it("contains one <Menu />", () => {
        const component = shallow(<App />);

        expect(component).to.have.exactly(1).descendants(Menu);
    });

    it("renders its children", () => {
        const component = shallow((
            <App>
                <span>
                    Button Text
                </span>
                <span>
                    Another One
                </span>
            </App>
        ));

        expect(component).to.have.exactly(2).descendants("span");
        expect(component).to.contain((
            <span>
                Button Text
            </span>
        ));
        expect(component).to.contain((
            <span>
                Another One
            </span>
        ));
    });
});
