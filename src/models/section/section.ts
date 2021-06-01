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

export interface ISections extends mongoose.Document {
    ai:number;
    code: string;
    page: ObjectID;
    name: string;
    url: string;
    title: string;
    created: Date;
    description: string;
    metakeyword: string;
    metatags: string;
    metatitle: string;
    metadesc: string;
}


export const SectionsSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    page: { type: ObjectID},
    name: { type: String},
    url: { type: String},
    title: { type: String},
    description: { type: String},
    metakeyword: { type: String},
    metatags: { type: String},
    metatitle: { type: String},
    metadesc: { type: String},
    created: { type: Date, default: new Date()},
});




SectionsSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Sections = mongoose.model<ISections>("sections", SectionsSchema);

export default Sections;
