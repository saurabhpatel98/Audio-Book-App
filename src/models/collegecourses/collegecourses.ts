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

export interface ICollegecourses extends mongoose.Document {
    ai:number;
    code: string;
    stream: string;
    course: string;
    specialization: string;
    seats: string;
    fees: string;
    scholarship: string;
    scholarshipamt: string;
    collegeid: ObjectID;
}


export const CollegecoursesSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    stream: { type: String},
    course: { type: String},
    seats: { type: String},
    fees: { type: String},
    scholarship: { type: String},
    scholarshipamt: { type: String},
    specialization: { type: Array},
    collegeid: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Collegecourses' }
      ]
});




CollegecoursesSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Collegecourses = mongoose.model<ICollegecourses>("collegecourses", CollegecoursesSchema);

export default Collegecourses;
