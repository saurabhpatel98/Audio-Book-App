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

export interface IEngineeringpage extends mongoose.Document {
    ai:number;
    code: string;
    heading1: string;
    description1: string;
    heading2: string;
    description2: string;
    column1: string;
    column2: string;
    column3: string;
    column4: string;
    content1: string;
    content2: string;
    content3: string;
}


export const EngineeringpageSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    heading1: { type: String},
    description1: { type: String},
    heading2: { type: String},
    description2: { type: String},
    column1: { type: String},
    column2: { type: String},
    column3: { type: String},
    column4: { type: String},
    content1: { type: String},
    content2: { type: String},
    content3: { type: String},
});




EngineeringpageSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Engineeringpage = mongoose.model<IEngineeringpage>("engineeringpagedatas", EngineeringpageSchema);

export default Engineeringpage;
