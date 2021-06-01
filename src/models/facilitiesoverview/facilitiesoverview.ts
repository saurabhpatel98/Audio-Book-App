//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IFacilitiesoverview extends mongoose.Document {
    ai:number;
    code: string;
    image: string;
    imagealt: string;
    imagetitle: string;
    imagedesc: string;
    facility: string;
    subtitle: string;
}


export const FacilitiesoverviewSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    image: { type: String },
    imagealt: { type: String },
    imagetitle: { type: String },
    imagedesc: { type: String },
    facility: { type: String },
    subtitle: { type: String },
});




FacilitiesoverviewSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Facilitiesoverview = mongoose.model<IFacilitiesoverview>("facilitiesoverview", FacilitiesoverviewSchema);

export default Facilitiesoverview;
