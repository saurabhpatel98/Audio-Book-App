//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IMemberreg extends mongoose.Document {
    ai:number;
    code: string;
    name: string;
    email: string;
    created: Date;
    password: string;
}

var validateEmail = function(email){
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

var validateMobile = function(mobile){
    var re = /^\d{10}$/;
    return re.test(mobile)
}

export const MemberregSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    name: { type: String, required: [true, 'Name is required'] },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    /* mobile: {
        type: String,
        trim: true,
        unique: true,
        required: 'Mobile Number is required',
        validate: [validateMobile, 'Please enter a valid number'],
        match: [/^\d{10}$/, 'Please enter a valid number']
    }, */
    password: {
        type: String, required: [true, 'Password is required']
    },
    created: { type: Date, default: Date.now },
});




MemberregSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Memberreg = mongoose.model<IMemberreg>("memberreg", MemberregSchema);

export default Memberreg;
