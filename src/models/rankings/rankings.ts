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

export interface IRankings extends mongoose.Document {
    ai:number;
    code: string;
    description: string;
}


export const RankingsSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    description: { type: String},
});




RankingsSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Rankings = mongoose.model<IRankings>("rankings", RankingsSchema);

export default Rankings;
