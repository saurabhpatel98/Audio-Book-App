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

export interface ICollegeplacements extends mongoose.Document {
    ai:number;
    code: string;
    stream: string;
    course: string;
    specialization: string;
    packagetype: string;
    packagevalue: string;
    studentsplaced: string;
    collegeid: ObjectID;
}


export const CollegeplacementsSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    stream: { type: String },
    course: { type: String },
    specialization: { type: Array },
    packagetype: { type: String },
    packagevalue: { type: String },
    studentsplaced: { type: String },
    collegeid: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Colleges' }
      ]
});




CollegeplacementsSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Collegeplacements = mongoose.model<ICollegeplacements>("collegeplacements", CollegeplacementsSchema);

export default Collegeplacements;
