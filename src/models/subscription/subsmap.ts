import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";
import {CountrySchema, ICountry} from "../country/country";
import {ISubscriptionType, SubscriptionTypeSchema} from "./substype";
import {ISubscriptionPlan, SubscriptionPlanSchema} from "./subsplan";
import {ISubscriptionPeriod, SubscriptionPeriodSchema} from "./subsperiod";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    } else {
        console.log("Succesfully Connected!");
    }

});

export interface ISubscriptionMapping extends mongoose.Document {
    ai:number;
    code: string;
    name: string;
    status: string;
    country:ICountry;
    type:ISubscriptionType;
    plan:ISubscriptionPlan;
    period:ISubscriptionPeriod;
    desc:string;
    price:number;
    image:string;
}


export const SubscriptionMappingSchema = new mongoose.Schema({
    ai: { type: Number, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    status: { type: String, required: true, default:'A' },
    country:{ type: CountrySchema, required: true},
    type:{ type: SubscriptionTypeSchema, required: true},
    plan:{ type: SubscriptionPlanSchema, required: true},
    period:{ type: SubscriptionPeriodSchema, required: true},
    desc: { type: String },
    price:{ type: Number, required: true },
    image:{ type: String }
});




SubscriptionMappingSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const SubscriptionMapping = mongoose.model<ISubscriptionMapping>("subsmaps_v", SubscriptionMappingSchema,"subsmaps_v");

export default SubscriptionMapping;
