//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";
import { ObjectID } from "bson";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IPlacements extends mongoose.Document {
    ai:number;
    code: string;
    course: ObjectID;
    company: string;
    logoalt: string;
    image: string;
    hiringfor: string;
    name: string;
    review: string;
    designation: string;
    sector: string;
}


export const PlacementsSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    course: { type: Array},
    company: { type: String},
    logoalt: { type: String},
    image: { type: String},
    hiringfor: { type: String},
    name: { type: String},
    review: { type: String},
    designation: { type: String},
    sector: { type: Array},
});




PlacementsSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Placements = mongoose.model<IPlacements>("placements", PlacementsSchema);

export default Placements;
