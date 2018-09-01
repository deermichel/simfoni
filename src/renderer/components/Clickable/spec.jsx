import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import Clickable from "./index";

describe("Clickable", () => {
    it("renders itself", () => {
        const component = shallow(<Clickable />);

        expect(component).to.be.present();
    });

    it("renders its children", () => {
        const component = shallow((
            <Clickable>
                <span>
                    Clickable Text
                </span>
                <span>
                    Another One
                </span>
            </Clickable>
        ));

        expect(component).to.have.exactly(2).descendants("span");
        expect(component).to.contain((
            <span>
                Clickable Text
            </span>
        ));
        expect(component).to.contain((
            <span>
                Another One
            </span>
        ));
    });

    it("invokes callback on click", () => {
        let callbackInvoked = false;
        const onClick = () => { callbackInvoked = true; };
        const component = shallow(<Clickable onClick={onClick} />);
        component.simulate("click");

        expect(callbackInvoked).to.equal(true);
    });

    it("does not invoke callback on click when disabled", () => {
        let callbackInvoked = false;
        const onClick = () => { callbackInvoked = true; };
        const component = shallow(<Clickable onClick={onClick} disabled />);
        component.simulate("click");

        expect(callbackInvoked).to.equal(false);
    });
});
