import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";
import {ISubscriptionMapping, SubscriptionMappingSchema} from "./subsmap";


mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    } else {
        console.log("Succesfully Connected!");
    }

});

export interface IMembershipTable extends mongoose.Document {
    ai: number,
    code: string;
    first_name: string;
    last_name: string;
    email:string;
    mobile_no:string;
    start_date: Date;
    end_date: Date;
    subsmap_cd: string
}


export const MembershipTableSchema = new mongoose.Schema({
    ai: { type: Number, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    mobile_no: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    subsmap_cd:{type:String,required: true}
});




MembershipTableSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
    // transform: (doc, ret, options) =>
    // {
    //     delete ret._id;
    //     return ret;
    // }
});

const MembershipTable = mongoose.model<IMembershipTable>("membership", MembershipTableSchema, "membership");

export default MembershipTable;
