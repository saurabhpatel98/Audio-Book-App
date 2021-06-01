//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface ISpecialization extends mongoose.Document {
    ai:number;
    code: string;
    specialization: string;
    stream: string;
    course: string;
}


export const SpecializationSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    stream: { type: String},
    course: { type: String},
    specialization: { type: String},
});




SpecializationSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Specialization = mongoose.model<ISpecialization>("specialization", SpecializationSchema);

export default Specialization;
