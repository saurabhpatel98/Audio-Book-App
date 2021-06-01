//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface ICourses extends mongoose.Document {
    ai:number;
    code: string;
    stream: string;
    specialization: string;
    course: string;
    deliverymode: string;
    award: string;
    duration: string;
    faculty: string;
    program_details: string;
    extra_electives: string;
    slidertitle: string;
    slideralt: string;
    overviewtitle: string;
    overviewdesc: string;
    overviewimagecaption: string;
}


export const CoursesSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    stream: { type: String },
    specialization: { type: String },
    course: { type: String },
    deliverymode: { type: String },
    award: { type: String },
    duration: { type: String },
    faculty: { type: String },
    program_details: { type: String },
    extra_electives: { type: String },
    slidertitle: { type: String },
    slideralt: { type: String },
    overviewtitle: { type: String },
    overviewdesc: { type: String },
    overviewimagecaption: { type: String },
});




CoursesSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Courses = mongoose.model<ICourses>("hkbkcourses", CoursesSchema);

export default Courses;
