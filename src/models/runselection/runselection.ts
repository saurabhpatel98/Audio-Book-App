import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";
import {CountrySchema, ICountry} from "../country/country";
import {CourseSchema, ICourse} from "../course/course";
import {IRace, RaceSchema} from "../race/race";
import {BetTypeSchema, IBetType} from "../bettype/bettype";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IRunningSelection extends mongoose.Document {
    code: number;
    status: string;
    country: ICountry;
    course: ICourse;
    race: IRace;
    bettype: IBetType;
    time: Date;
    is_free: boolean;
    subs_mappings: [string];
    selections: string;
}


export const RunningSelectionSchema = new mongoose.Schema({
    code: { type: Number, required: true, unique: true },
    status: { type: String, required: true },
    country: { type: CountrySchema, required: true },
    course: { type: CourseSchema, required: true },
    race: { type: RaceSchema, required: true },
    bettype: { type: BetTypeSchema, required: true },
    time: { type: Date, required: true },
    is_free: { type: Boolean, required: true },
    subs_mappings: { type: Array, required: true },
    selections: { type: String, required: true },

});




RunningSelectionSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
    // transform: (doc, ret, options) =>
    // {
    //     delete ret._id;
    //     return ret;
    // }
});

const runselection = mongoose.model<IRunningSelection>("runningbets_v", RunningSelectionSchema,"runningbets_v");

export default runselection;
