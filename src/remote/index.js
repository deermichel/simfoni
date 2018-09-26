import configureStore from "./configureStore";
import { getPersistedState } from "~/middleware/persist";

configureStore(getPersistedState());
