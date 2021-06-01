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

export interface IHomeranksection extends mongoose.Document {
    ai:number;
    code: string;
    heading: string;
    description: string;
}


export const HomeranksectionSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    heading: { type: String},
    description: { type: String},
});




HomeranksectionSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Homeranksection = mongoose.model<IHomeranksection>("homeranksections", HomeranksectionSchema);

export default Homeranksection;
