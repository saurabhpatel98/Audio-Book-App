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

export interface IStudentstories extends mongoose.Document {
    ai:number;
    code: string;
    name: string;
    designation: String;
    description: string;
    priority: string;
}


export const StudentstoriesSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    name: { type: String},
    designation: { type: String},
    description: { type: String},
    priority: { type: String},
});




StudentstoriesSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Studentstories = mongoose.model<IStudentstories>("studentstories", StudentstoriesSchema);

export default Studentstories;
