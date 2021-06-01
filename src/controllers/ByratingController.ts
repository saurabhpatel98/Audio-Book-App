// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Byrating, {IByrating} from '../models/byrating/byrating'
import Course from "../models/course/course";

export class ByratingController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let byrating = Byrating.find((err: any, byrating: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": byrating });
            }
        });
    }


    /* public findAllFromCourse(req: Request, res: Response) {

        const code = req.params.code;

        Course.aggregate([
            {
                "$group" : {
                    "_id": "$country"
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
    } */

    public findByCode(req: Request, res: Response) {

        let byrating = Byrating.findById(req.params.code, (err: any, byrating: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": byrating });
            }
        });
    }


    public addByrating = (req: Request, res: Response) => {
        let byrating = new Byrating(req.body);

        byrating.ai =1;
        byrating.code = 'RR1';

        Byrating.findOne( {}, {}, {}, (err:any,result:IByrating) => {
            if(result){
                byrating.ai =  result.ai + 1;
                byrating.code =  'RR' + byrating.ai;
            }

            byrating.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": byrating });
                }
            });

        }).sort({"ai":-1}).limit(1);


    };

    public updateByrating = (req: Request, res: Response) => {
        let byrating = new Byrating(req.body);

        byrating.updateOne(byrating,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": byrating });
            }
        });

    };

    public removeByrating = (req: Request, res: Response) => {

        var byrating = new Byrating(req.body);


        Byrating.findByIdAndDelete(byrating.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": byrating });
            }
        });

    };

}

export const byratingController = new ByratingController ();
