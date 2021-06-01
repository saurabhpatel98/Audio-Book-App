//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";
import { ObjectID } from "bson";
import {CollegesSchema, IColleges} from "../colleges/colleges";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface ITestimonials extends mongoose.Document {
    ai:number;
    code: string;
    name: string;
    designation: string;
    description: string;
    created: Date;
    image: string;
}


export const TestimonialsSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    name: { type: String},
    designation: { type: String},
    description: { type: String},
    image: { type: String},
    created: { type: Date, default: new Date()},
});




TestimonialsSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Testimonials = mongoose.model<ITestimonials>("testimonials", TestimonialsSchema);

export default Testimonials;
