//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IStudymode extends mongoose.Document {
    ai:number;
    code: string;
    studymode: string;
}


export const StudymodeSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    studymode: { type: String, required: true }
});




StudymodeSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Studymode = mongoose.model<IStudymode>("studymode", StudymodeSchema);

export default Studymode;
