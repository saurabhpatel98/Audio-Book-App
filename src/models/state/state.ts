//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";
import {CountrySchema, ICountry} from "../country/country";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IState extends mongoose.Document {
    ai:number;
    code: string;
    name: string;
    country: string;
}


export const StateSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    name: { type: String},
    country: { type: String},
});




StateSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const State = mongoose.model<IState>("states", StateSchema);

export default State;
