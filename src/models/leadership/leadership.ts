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

export interface ILeadership extends mongoose.Document {
    ai:number;
    code: string;
    name: string;
    designation: string;
    description: string;
    college: string;
    type:string;
}


export const LeadershipSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    name: { type: String},
    designation: { type: String},
    description: { type: String},
    college{ type: String},
    type{ type: Array},
});




LeadershipSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Leadership = mongoose.model<ILeadership>("leaderships", LeadershipSchema);

export default Leadership;
