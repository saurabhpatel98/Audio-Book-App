//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";
import { ObjectID } from "bson";
import {CollegesSchema, IColleges} from "../colleges/colleges";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IBrowsebyabout extends mongoose.Document {
    ai:number;
    code: string;
    name: string;
    url: string;
    created: Date;
}


export const BrowsebyaboutSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    name: { type: String},
    url: { type: String},
    created: { type: Date, default: new Date()},
});




BrowsebyaboutSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Browsebyabout = mongoose.model<IBrowsebyabout>("browsebyabouts", BrowsebyaboutSchema);

export default Browsebyabout;
