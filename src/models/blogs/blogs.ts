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

export interface IBlogs extends mongoose.Document {
    ai:number;
    code: string;
    blogheading: string;
    blogcontent: string;
    created: Date;
    image: string;
}


export const BlogsSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    blogheading: { type: String},
    blogcontent: { type: String},
    image: { type: String},
    created: { type: Date, default: new Date()},
});




BlogsSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Blogs = mongoose.model<IBlogs>("blogs", BlogsSchema);

export default Blogs;
