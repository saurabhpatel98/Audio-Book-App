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

export interface IFee extends mongoose.Document {
    ai:number;
    code: string;
    coursename: string;
    duration: string;
    course: ObjectID;
    scholarship: string;
    dtution_1: string;
    dacademic_1: string;
    dtotal_1: string;
    itution_1: string;
    iacademic_1: string;
    itotal_1: string;
    dtution_2: string;
    dacademic_2: string;
    dtotal_2: string;
    itution_2: string;
    iacademic_2: string;
    itotal_2: string;
    dtution_3: string;
    dacademic_3: string;
    dtotal_3: string;
    itution_3: string;
    iacademic_3: string;
    itotal_3: string;
    dtution_4: string;
    dacademic_4: string;
    dtotal_4: string;
    itution_4: string;
    iacademic_4: string;
    itotal_4: string;
    /* dtution_5: string;
    dacademic_5: string;
    dtotal_5: string;
    ttution_5: string;
    tacademic_5: string;
    ttotal_5: string; */
}


export const FeeSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    coursename: { type: String},
    duration: { type: String},
    course: { type: ObjectID},
    scholarship: { type: String},
    dtution_1: { type: String},
    dacademic_1: { type: String},
    dtotal_1: { type: String},
    itution_1: { type: String},
    iacademic_1: { type: String},
    itotal_1: { type: String},
    dtution_2: { type: String},
    dacademic_2: { type: String},
    dtotal_2: { type: String},
    itution_2: { type: String},
    iacademic_2: { type: String},
    itotal_2: { type: String},
    dtution_3: { type: String},
    dacademic_3: { type: String},
    dtotal_3: { type: String},
    itution_3: { type: String},
    iacademic_3: { type: String},
    itotal_3: { type: String},
    dtution_4: { type: String},
    dacademic_4: { type: String},
    dtotal_4: { type: String},
    itution_4: { type: String},
    iacademic_4: { type: String},
    itotal_4: { type: String},
    /* dtution_5: { type: String},
    dacademic_5: { type: String},
    dtotal_5: { type: String},
    ttution_5: { type: String},
    tacademic_5: { type: String},
    ttotal_5: { type: String}, */
});




FeeSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Fee = mongoose.model<IFee>("fees", FeeSchema);

export default Fee;
