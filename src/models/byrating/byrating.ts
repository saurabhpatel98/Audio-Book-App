//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IByrating extends mongoose.Document {
    ai:number;
    code: string;
    ratings: string;
}


export const ByratingSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    ratings: { type: String, required: true }
});




ByratingSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Byrating = mongoose.model<IByrating>("byrating", ByratingSchema);

export default Byrating;
