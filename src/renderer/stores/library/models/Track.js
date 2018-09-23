import { fk, attr, Model } from "redux-orm";

class Track extends Model {}

Track.modelName = "Track";
Track.fields = {
    title: attr(),
    duration: attr(),
    uri: attr(),
    album: fk("Album", "tracks"),
};

export default Track;
