//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IPlacementsoverview extends mongoose.Document {
    ai:number;
    code: string;
    heading: string;
    title: string;
    description: string;
    heading1: string;
    title1: string;
    heading2: string;
    title2: string;
    heading3: string;
    title3: string;
    heading4: string;
    title4: string;
    heading5: string;
    title5: string;
    heading6: string;
    title6: string;
    heading7: string;
    title7: string;
    heading8: string;
    title8: string;
    heading9: string;
    title9: string;
}


export const PlacementsoverviewSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    heading: { type: String },
    title: { type: String },
    description: { type: String },
    heading1: { type: String },
    title1: { type: String },
    heading2: { type: String },
    title2: { type: String },
    heading3: { type: String },
    title3: { type: String },
    heading4: { type: String },
    title4: { type: String },
    heading5: { type: String },
    title5: { type: String },
    heading6: { type: String },
    title6: { type: String },
    heading7: { type: String },
    title7: { type: String },
    heading8: { type: String },
    title8: { type: String },
    heading9: { type: String },
    title9: { type: String },
});




PlacementsoverviewSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Placementsoverview = mongoose.model<IPlacementsoverview>("placementsoverviews", PlacementsoverviewSchema);

export default Placementsoverview;
