import { Model, attr } from "redux-orm";

class Artist extends Model {}

Artist.modelName = "Artist";
Artist.fields = {
    name: attr(),
};

export default Artist;
