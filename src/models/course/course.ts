//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "./../dbconnect";
import {Schema} from "mongoose";
import {CountrySchema, ICountry} from "../country/country";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    } else {
        console.log("Succesfully Connected!");
    }
});

export interface ICourse extends mongoose.Document {
    code: string;
    name: string;
    country: ICountry;
}

export const CourseSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    country: { type: CountrySchema, required: true }
});


const Course = mongoose.model<ICourse>("courses_v", CourseSchema, "courses_v" );

export default Course;
