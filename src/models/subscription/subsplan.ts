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

export interface ISubscriptionPlan extends mongoose.Document {
    ai:number;
    code: string;
    name: string;
}


export const SubscriptionPlanSchema = new mongoose.Schema({
    ai: { type: Number, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true }
});




SubscriptionPlanSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
    // transform: (doc, ret, options) =>
    // {
    //     delete ret._id;
    //     return ret;
    // }
});

const SubscriptionPlan = mongoose.model<ISubscriptionPlan>("subsplans", SubscriptionPlanSchema);

export default SubscriptionPlan;
