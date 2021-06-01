//https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52
import * as mongoose from "mongoose";
import MongoConnectionString from "../dbconnect";
import {Schema} from "mongoose";

mongoose.connect(MongoConnectionString, { useNewUrlParser: true }, (err: any) => { 
    if (err) {
        console.log(err.message);
    }
});

export interface IProducts extends mongoose.Document {
    ai:number;
    code: string;
    prod_name: string;
    prod_desc: string;
    prod_price: number;
    // updated_at: Date;
}


export const ProductsSchema = new mongoose.Schema({
    ai: { type: Number, unique: true },
    code: { type: String, unique: true },
    prod_name: { type: String, required: true },
    prod_desc: { type: String, required: true },
    prod_price: { type: Number, required: true },
    // updated_at: { type: Date }
});




ProductsSchema.set('toJSON', {
    virtuals: false,
    versionKey: false
});

const Products = mongoose.model<IProducts>("products", ProductsSchema);

export default Products;
