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

export interface IAboutoverview extends mongoose.Document {
    ai:number;
    code: string;
    overview: string;
    vision: string;
    mission: string;
    usps: string;
    campus: string;
    green: string;
    innovation: string;
    ragging: string;
}


export const AboutoverviewSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    overview: { type: String},
    vision: { type: String},
    mission: { type: String},
    usps: { type: String},
    campus: { type: String},
    green: { type: String},
    innovation: { type: String},
    ragging: { type: String},
});




AboutoverviewSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Aboutoverview = mongoose.model<IAboutoverview>("aboutoverviews", AboutoverviewSchema);

export default Aboutoverview;
