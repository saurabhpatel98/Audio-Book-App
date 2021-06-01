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

export interface ICurriculum extends mongoose.Document {
    ai:number;
    code: string;
    coursename: string;
    course: ObjectID;
    year: string;
    semister1: string;
    semister2: string;
}


export const CurriculumSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    coursename: { type: String},
    course: { type: ObjectID},
    year: { type: String},
    semister1: { type: String},
    semister2: { type: String},
});




CurriculumSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Curriculum = mongoose.model<ICurriculum>("curriculums", CurriculumSchema);

export default Curriculum;
