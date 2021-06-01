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

export interface ICollegefacilities extends mongoose.Document {
    ai:number;
    code: string;
    facilities: string;
    collegeid: ObjectID;
}


export const CollegefacilitiesSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    facilities: { type: Array },
    collegeid: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Colleges' }
      ]
});




CollegefacilitiesSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Collegefacilities = mongoose.model<ICollegefacilities>("collegefacilities", CollegefacilitiesSchema);

export default Collegefacilities;
