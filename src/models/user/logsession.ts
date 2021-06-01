import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";
import bcrypt from "bcrypt";
import {IUser, UserSchema} from "./user";


mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});


export interface IUserSession extends mongoose.Document {
    ses_id: string;
    username: string;
    logged_at: Date;
    last_ip:string;
}


export const UserSessionSchema = new mongoose.Schema({
    ses_id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    logged_at: { type: Date, required: true },
    last_ip: { type: String, required: true }
});

UserSessionSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const UserSession = mongoose.model<IUserSession>("user_logins", UserSessionSchema);

export default UserSession;
