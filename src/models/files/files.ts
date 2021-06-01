//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";


mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IFiles extends mongoose.Document {
    filename:string;
}


export const FilesSchema = new mongoose.Schema({
    filename: { type: String, required: true }
});




FilesSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Files = mongoose.model<IFiles>("files", FilesSchema);

export default Files;
