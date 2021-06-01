//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IFacilities extends mongoose.Document {
    ai:number;
    code: string;
    facility: string;
}


export const FacilitiesSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    facility: { type: String, required: true }
});




FacilitiesSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Facilities = mongoose.model<IFacilities>("facilities", FacilitiesSchema);

export default Facilities;
