// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Products, {IProducts} from '../models/products/products'
import Course from "../models/course/course";

export class ProductsController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let countries = Products.find((err: any, countries: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": countries });
            }
        });
    }


    public findAllFromCourse(req: Request, res: Response) {

        const code = req.params.code;

        Course.aggregate([
            {
                "$group" : {
                    "_id": "$products"
                }
            },
            {
                "$project":
                    { "_id" : "$_id._id", "code" : "$_id.code", "name" : "$_id.name" }
            }
        ],function(err,result) {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": result});
            }
        });
    }

    public findByCode(req: Request, res: Response) {

        let products = Products.findById(req.params.code, (err: any, products: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": products });
            }
        });
    }


    public addProducts = (req: Request, res: Response) => {
        let products = new Products(req.body);

        products.ai =1;
        products.code = 'CC1';

        Products.findOne( {}, {}, {}, (err:any,result:IProducts) => {
            if(result){
                products.ai =  result.ai + 1;
                products.code =  'CC' + products.ai;
            }

            products.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": products });
                }
            });

        }).sort({"ai":-1}).limit(1);


    };

    public updateProducts = (req: Request, res: Response) => {
        let products = new Products(req.body);

        products.updateOne(products,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": products });
            }
        });

    };

    public removeProducts = (req: Request, res: Response) => {

        var products = new Products(req.body);


        Products.findByIdAndDelete(products.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": products });
            }
        });

    };

}

export const productsController = new ProductsController ();
