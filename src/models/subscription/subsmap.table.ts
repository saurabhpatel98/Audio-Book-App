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

export interface ISubscriptionMappingTable extends mongoose.Document {
    ai:number;
    code: string;
    name: string;
    status: string;
    cou_cd: string;
    type_cd:string;
    plan_cd:string;
    period_cd:string;
    desc:string;
    price:number;
    image:string;
}


export const SubscriptionMappingTableSchema = new mongoose.Schema({
    ai: { type: Number, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    status: { type: String, required: true, default:'A' },
    cou_cd:{ type: String, required: true },
    type_cd:{ type: String, required: true },
    plan_cd:{ type: String, required: true },
    period_cd:{ type: String, required: true },
    desc: { type: String },
    price:{ type: Number, required: true },
    image:{ type: String }
});




SubscriptionMappingTableSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const SubscriptionMappingTable = mongoose.model<ISubscriptionMappingTable>("subsmaps", SubscriptionMappingTableSchema,"subsmaps");

export default SubscriptionMappingTable;
