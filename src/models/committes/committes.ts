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

export interface ICommittes extends mongoose.Document {
    ai:number;
    code: string;
    name: string;
    members: string;
    functions: string;
}


export const CommittesSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    name: { type: String},
    members: { type: String},
    functions: { type: String},
});




CommittesSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Committes = mongoose.model<ICommittes>("committes", CommittesSchema);

export default Committes;
