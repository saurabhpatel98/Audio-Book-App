//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IStreams extends mongoose.Document {
    ai:number;
    code: string;
    stream: string;
}


export const StreamsSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    stream: { type: String, required: true }
});




StreamsSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Streams = mongoose.model<IStreams>("streams", StreamsSchema);

export default Streams;
