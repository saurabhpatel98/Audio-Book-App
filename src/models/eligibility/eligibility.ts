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

export interface IEligibility extends mongoose.Document {
    ai:number;
    code: string;
    coursename: string;
    course: ObjectID;
    title: string;
    description: string;
}


export const EligibilitySchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    coursename: { type: String},
    course: { type: ObjectID},
    title: { type: String},
    description: { type: String},
});




EligibilitySchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Eligibility = mongoose.model<IEligibility>("eligibilitys", EligibilitySchema);

export default Eligibility;
