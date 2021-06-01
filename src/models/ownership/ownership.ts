//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IOwnership extends mongoose.Document {
    ai:number;
    code: string;
    ownershiptype: string;
}


export const OwnershipSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    ownershiptype: { type: String, required: true }
});




OwnershipSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Ownership = mongoose.model<IOwnership>("ownership", OwnershipSchema);

export default Ownership;
