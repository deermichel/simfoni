import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import chai from "chai";
import chaiImmutable from "chai-immutable";
import chaiEnzyme from "chai-enzyme";

enzyme.configure({ adapter: new Adapter() });

chai.use(chaiImmutable);
chai.use(chaiEnzyme());
