//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IBooks extends mongoose.Document {
    ai:number;
    code: string;
    name: string;
}


export const BooksSchema = new mongoose.Schema({
    ai: { type: Number, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true }
});




BooksSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Books = mongoose.model<IBooks>("books", BooksSchema);

export default Books;
