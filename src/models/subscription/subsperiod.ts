import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    } else {
        console.log("Succesfully Connected!");
    }



});

export interface ISubscriptionPeriod extends mongoose.Document {
    ai:number;
    code: string;
    name: string;
    status: string;
    period_type: number;
    period_value: number;
    days:number;
}


export const SubscriptionPeriodSchema = new mongoose.Schema({
    ai: { type: Number, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    period_type: { type: Number, required: true },
    period_value: { type: Number, required: true },
    days: { type: Number, required: true },
});




SubscriptionPeriodSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
    // transform: (doc, ret, options) =>
    // {
    //     delete ret._id;
    //     return ret;
    // }
});

const SubscriptionPeriod = mongoose.model<ISubscriptionPeriod>("subsperiods", SubscriptionPeriodSchema);

export default SubscriptionPeriod;
