import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";


mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }

});

export interface IBetType extends mongoose.Document {
    ai:number;
    code: string;
    name: string;
}


export const BetTypeSchema = new mongoose.Schema({
    ai: { type: Number, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true }
});



const BetType = mongoose.model<IBetType>("bettypes", BetTypeSchema);

export default BetType;
