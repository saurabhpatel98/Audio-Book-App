//Race Course Mapping Table
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    } else {
        console.log("Succesfully Connected!");
    }
});

export interface IRcmTable extends mongoose.Document {
    ai:number;
    code: string;
    cou_cd: string,
    cor_cd: string,
    race_list: string[]
}


export const RcmTableSchema = new mongoose.Schema({
    ai: { type: Number, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    cou_cd: { type: String, required: true },
    cor_cd: { type: String, required: true },
    race_list: { type: Array, required: true }
});




RcmTableSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
    // transform: (doc, ret, options) =>
    // {
    //     delete ret._id;
    //     return ret;
    // }
});

const RcmTable = mongoose.model<IRcmTable>("rcms", RcmTableSchema,"rcms");

export default RcmTable;
