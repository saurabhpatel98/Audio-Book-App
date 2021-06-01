//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";
import { ObjectID } from "bson";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IHomebannermenu extends mongoose.Document {
    ai:number;
    code: string;
    name1: string;
    url1: string;
    name2: string;
    url2: string;
    name3: string;
    url3: string;
    name4: string;
    url4: string;
    name5: string;
    url5: string;
    cardtitle1: string;
    cardtitle2: string;
    cardtitle3: string;
    url6: string;
    url7: string;
    url8: string;
    content1: string;
    content2: string;
    content3: string;
    desc1: string;
    desc2: string;
    desc3: string;
    content4: string;
    content5: string;
    content6: string;
    desc4: string;
    desc5: string;
    desc6: string;
    aluheading: string;
    aludesc: string;
    alurecruiters: string;
    aluplacements: string;
    alupackage: string;
}


export const HomebannermenuSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    name1: { type: String},
    url1: { type: String},
    name2: { type: String},
    url2: { type: String},
    name3: { type: String},
    url3: { type: String},
    name4: { type: String},
    url4: { type: String},
    name5: { type: String},
    url5: { type: String},
    cardtitle1: { type: String},
    cardtitle2: { type: String},
    cardtitle3: { type: String},
    url6: { type: String},
    url7: { type: String},
    url8: { type: String},
    content1: { type: String},
    content2: { type: String},
    content3: { type: String},
    desc1: { type: String},
    desc2: { type: String},
    desc3: { type: String},
    content4: { type: String},
    content5: { type: String},
    content6: { type: String},
    desc4: { type: String},
    desc5: { type: String},
    desc6: { type: String},
    aluheading: { type: String},
    aludesc: { type: String},
    alurecruiters: { type: String},
    aluplacements: { type: String},
    alupackage: { type: String},
});




HomebannermenuSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Homebannermenu = mongoose.model<IHomebannermenu>("homebannermenus", HomebannermenuSchema);

export default Homebannermenu;
