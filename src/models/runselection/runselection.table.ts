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

export interface IRunningSelectionTable extends mongoose.Document {
    ai:number;
    code: number;
    status: string;
    cou_cd: string;
    cor_cd: string;
    rac_cd: string;
    bet_cd: string;
    time: Date;
    is_free: boolean;
    subs_mappings: [string];
    selections: string;
}


export const RunningSelectionTableSchema = new mongoose.Schema({
    ai: { type: Number, required: true, unique: true },
    code: { type: Number, required: true, unique: true },
    status: { type: String, required: true },
    cou_cd: { type: String, required: true },
    cor_cd: { type: String, required: true },
    rac_cd: { type: String, required: true },
    bet_cd: { type: String, required: true },
    time: { type: Date, required: true },
    is_free: { type: Boolean, required: true },
    subs_mappings: { type: Array, required: true },
    selections: { type: String, required: true },

});




RunningSelectionTableSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
    // transform: (doc, ret, options) =>
    // {
    //     delete ret._id;
    //     return ret;
    // }
});

const betselectionTable = mongoose.model<IRunningSelectionTable>("runningbets", RunningSelectionTableSchema);

export default betselectionTable;
