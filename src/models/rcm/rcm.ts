//Race Course Mapping
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";
import {IRace} from "../race/race";
import {CountrySchema, ICountry} from "../country/country";
import {CourseSchema, ICourse} from "../course/course";
import CourseTable from "../course/course_table";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    } else {
        console.log("Succesfully Connected!");
    }
});

export interface IRcm extends mongoose.Document {
    ai:number;
    code: string;
    // name: string;
    country: ICountry,
    course: ICourse,
    race_list: IRace[]
}


export const RcmSchema = new mongoose.Schema({
    ai: { type: Number, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    country: { type: CountrySchema, required: true },
    course: { type: CourseSchema, required: true },
    race_list: { type: Array, required: true }
});




RcmSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
    // transform: (doc, ret, options) =>
    // {
    //     delete ret._id;
    //     return ret;
    // }
});

const Rcm = mongoose.model<IRcm>("rcms_v", RcmSchema,"rcms_v");

export default Rcm;
