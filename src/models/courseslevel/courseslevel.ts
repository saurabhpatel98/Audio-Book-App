//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface ICourseslevel extends mongoose.Document {
    ai:number;
    code: string;
    name: string;
}


export const CourseslevelSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    name: { type: String, required: true }
});




CourseslevelSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Courseslevel = mongoose.model<ICourseslevel>("courseslevel", CourseslevelSchema);

export default Courseslevel;
