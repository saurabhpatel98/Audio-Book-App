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

export interface IAdvancedengineering extends mongoose.Document {
    ai:number;
    code: string;
    imagealt: string;
    heading: string;
    description: string;
    image: string;
}


export const AdvancedengineeringSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    imagealt: { type: String},
    heading: { type: String},
    description: { type: String},
    image: { type: String},
});




AdvancedengineeringSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Advancedengineering = mongoose.model<IAdvancedengineering>("advancedengineerings", AdvancedengineeringSchema);

export default Advancedengineering;
