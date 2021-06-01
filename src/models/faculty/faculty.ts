//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IFaculty extends mongoose.Document {
    ai:number;
    code: string;
    image: string;
    imagealt: string;
    name: string;
    department: string;
    designation: string;
}


export const FacultySchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    image: { type: String },
    imagealt: { type: String },
    name: { type: String },
    department: { type: String },
    designation: { type: String },
});




FacultySchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Faculty = mongoose.model<IFaculty>("faculties", FacultySchema);

export default Faculty;
