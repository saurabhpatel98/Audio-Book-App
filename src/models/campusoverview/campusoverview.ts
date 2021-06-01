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

export interface ICampusoverview extends mongoose.Document {
    ai:number;
    code: string;
    overview: string;
    overviewlist: string;
}


export const CampusoverviewSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    overview: { type: String},
    overviewlist: { type: String},
});




CampusoverviewSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Campusoverview = mongoose.model<ICampusoverview>("campusoverviews", CampusoverviewSchema);

export default Campusoverview;
