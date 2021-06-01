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

export interface IPages extends mongoose.Document {
    ai:number;
    code: string;
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


export const PagesSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
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




PagesSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Pages = mongoose.model<IPages>("pages", PagesSchema);

export default Pages;
