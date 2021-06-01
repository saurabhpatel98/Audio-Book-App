//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IUploads extends mongoose.Document {
    ai:number;
    code: string;
    image: string;
}


export const UploadsSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    image: { type: String },
});




UploadsSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Uploads = mongoose.model<IUploads>("upload", UploadsSchema);

export default Uploads;
