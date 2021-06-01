//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";
import { ObjectID } from "bson";
import {CollegesSchema, IColleges} from "../colleges/colleges";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IPlacementsnews extends mongoose.Document {
    ai:number;
    code: string;
    title: string;
    description: string;
    priority: string;
    created: Date;
}


export const PlacementsnewsSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    title: { type: String},
    description: { type: String},
    priority: { type: String},
    created: { type: Date, default: new Date()},
});




PlacementsnewsSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Placementsnews = mongoose.model<IPlacementsnews>("placementsnews", PlacementsnewsSchema);

export default Placementsnews;
