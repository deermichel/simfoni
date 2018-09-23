import { ORM } from "redux-orm";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const orm = new ORM();
orm.register(Artist, Album, Track);

export default orm;
