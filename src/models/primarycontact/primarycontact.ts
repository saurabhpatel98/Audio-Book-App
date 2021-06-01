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

export interface IPrimarycontact extends mongoose.Document {
    ai:number;
    code: string;
    contactperson: string;
    contactno: string;
    contactemail: string;
    collegeid: ObjectID;
}


export const PrimarycontactSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    contactperson: { type: String},
    contactno: { type: String},
    contactemail: { type: String},
    collegeid: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Colleges' }
      ]
});




PrimarycontactSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Primarycontact = mongoose.model<IPrimarycontact>("primarycontacts", PrimarycontactSchema);

export default Primarycontact;
