import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import chai from "chai";
import chaiImmutable from "chai-immutable";
import chaiEnzyme from "chai-enzyme";
import chaiSinon from "sinon-chai";
import { JSDOM } from "jsdom";

enzyme.configure({ adapter: new Adapter() });

chai.use(chaiImmutable);
chai.use(chaiEnzyme());
chai.use(chaiSinon);

const jsdom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.window = jsdom.window;
global.document = window.document;
