//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IOtherinfo extends mongoose.Document {
    ai:number;
    code: string;
    image: string;
    imagealt: string;
    title: string;
    desc: string;
    type: string;
}


export const OtherinfoSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    image: { type: String },
    imagealt: { type: String },
    title: { type: String },
    desc: { type: String },
    type: { type: String },
});




OtherinfoSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Otherinfo = mongoose.model<IOtherinfo>("otherinfoplacements", OtherinfoSchema);

export default Otherinfo;
