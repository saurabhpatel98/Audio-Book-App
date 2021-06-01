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

export interface INews extends mongoose.Document {
    ai:number;
    code: string;
    title: string;
    description: string;
    created: Date;
    priority: string;
}


export const NewsSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    title: { type: String},
    description: { type: String},
    priority: { type: String},
    created: { type: Date, default: new Date()},
});




NewsSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const News = mongoose.model<INews>("news", NewsSchema);

export default News;
