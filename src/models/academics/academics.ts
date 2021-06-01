//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IAcademics extends mongoose.Document {
    ai:number;
    code: string;
    image: string;
    imagealt: string;
    imagetitle: string;
    imagedesc: string;
    type: string;
    subtitle: string;
}


export const AcademicsSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    image: { type: String },
    imagealt: { type: String },
    imagetitle: { type: String },
    imagedesc: { type: String },
    type: { type: String },
    subtitle: { type: String },
});




AcademicsSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Academics = mongoose.model<IAcademics>("academics", AcademicsSchema);

export default Academics;
