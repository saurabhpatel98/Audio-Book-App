//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
// https://brianflove.com/2016/10/04/typescript-declaring-mongoose-schema-model/
// https://ramlez.com/blog/node-js-typescript-2-x-mongodb-quick-start-2/

import * as mongoose from "mongoose";
import MongoConnectionString from "./../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    } else {
        console.log("Succesfully Connected!");
    }
});



export interface ICourseTable extends mongoose.Document {
    ai:number;
    code: string;
    name: string;
    cou_cd: string;
}

export const CourseTableSchema = new mongoose.Schema({
    ai: { type: Number, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    cou_cd: { type: String, required: true }
});



CourseTableSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const CourseTable = mongoose.model<ICourseTable>("courses", CourseTableSchema, "courses");

export default CourseTable;
