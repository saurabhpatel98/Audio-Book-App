//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface ICity extends mongoose.Document {
    ai:number;
    code: string;
    name: string;
    state: string;
    country: string;
}


export const CitySchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    name: { type: String},
    state: { type: String},
    country: { type: String},
});




CitySchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const City = mongoose.model<ICity>("cities", CitySchema);

export default City;
