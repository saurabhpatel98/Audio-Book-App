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

export interface IExams extends mongoose.Document {
    ai:number;
    code: string;
    examname: string;
    opendate: string;
    closedate: string;
    examstart: string;
    resultdate: string;
}


export const ExamsSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    examname: { type: String},
    opendate: { type: String},
    closedate: { type: String},
    examstart: { type: String},
    resultdate: { type: String},
});




ExamsSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Exams = mongoose.model<IExams>("exams", ExamsSchema);

export default Exams;
