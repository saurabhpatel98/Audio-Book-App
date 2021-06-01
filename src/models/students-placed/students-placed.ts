//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IStudentsplaced extends mongoose.Document {
    ai:number;
    code: string;
    image: string;
    imagealt: string;
    name: string;
    desc: string;
    placedin: string;
}


export const StudentsplacedSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    image: { type: String },
    imagealt: { type: String },
    name: { type: String },
    desc: { type: String },
    placedin: { type: String },
});




StudentsplacedSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Studentsplaced = mongoose.model<IStudentsplaced>("placedstudents", StudentsplacedSchema);

export default Studentsplaced;
