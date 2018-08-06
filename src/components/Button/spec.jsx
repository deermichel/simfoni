import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import Button from "./index";

describe("Button", () => {
    it("renders with correct class name", () => {
        const component = shallow(<Button />);

        expect(component).to.be.present();
        expect(component).to.have.className("button");
    });

    it("renders its children", () => {
        const component = shallow((
            <Button>
                <span>
                    Button Text
                </span>
                <span>
                    Another One
                </span>
            </Button>
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

    it("invokes callback on click", () => {
        let callbackInvoked = false;
        const onClick = () => { callbackInvoked = true; };
        const component = shallow(<Button onClick={onClick} />);
        component.simulate("click");

        expect(callbackInvoked).to.equal(true);
    });
});
