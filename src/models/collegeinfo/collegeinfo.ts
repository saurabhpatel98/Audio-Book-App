//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";
import { ObjectID } from "bson";
import {CollegesSchema, IColleges} from "../colleges/colleges";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface ICollegeinfo extends mongoose.Document {
    ai:number;
    code: string;
    title: string;
    collegeurl: string;
    established: string;
    collegecontact: string;
    collegeemail: string;
    ownership: string;
    approvedby: string;
    collegeaddress: string;
    status: string;
    country: string;
    state: string;
    city: string;
    scholarship: string;
    scholarshipamt: string;
    about: string;
    highlights: string;
    metatitle: string;
    metadescription: string;
    keywords: string;
    tags: string;
    logo: string;
    collegeid: ObjectID;
}


export const CollegeinfoSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    title: { type: String},
    collegeurl: { type: String},
    established: { type: String},
    collegecontact: { type: String},
    collegeemail: { type: String},
    ownership: { type: String},
    approvedby: { type: String},
    collegeaddress: { type: String},
    status: { type: String},
    country: { type: String},
    state: { type: String},
    city: { type: String},
    scholarship: { type: String},
    scholarshipamt: { type: String},
    about: { type: String},
    highlights: { type: String},
    metatitle: { type: String},
    metadescription: { type: String},
    keywords: { type: Array},
    tags: { type: Array},
    logo: { type: String},
    collegeid: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Colleges' }
      ]
});




CollegeinfoSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Collegeinfo = mongoose.model<ICollegeinfo>("collegeinfos", CollegeinfoSchema);

export default Collegeinfo;
