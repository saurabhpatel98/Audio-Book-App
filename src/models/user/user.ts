import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";
import bcrypt from "bcrypt";
import {RaceSchema} from "../race/race";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IUser extends mongoose.Document {
    ai:number;
    username: string;
    password: string;
    email:string;
}


export const UserSchema = new mongoose.Schema({
    ai: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
});


UserSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const User = mongoose.model<IUser>("users", UserSchema);

export default User;
