// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Otherinfo, {IOtherinfo} from '../models/placements-otherinfo/placements-otherinfo'
import Course from "../models/course/course";

export class OtherinfoController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let otherinfo = Otherinfo.find((err: any, otherinfo: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": otherinfo });
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

    public findById(req: Request, res: Response) {

        let otherinfo = Otherinfo.findById(req.params.id, (err: any, otherinfo: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": otherinfo });
            }
        });
    }
    public findByType(req: Request, res: Response) {

        let otherinfo = Otherinfo.find({type : req.params.type}, (err: any, otherinfo: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": otherinfo });
            }
        });
    }

    public findForExistingKey(req: Request, res: Response) {

        let otherinfo = Otherinfo.find({"name":{'$exists': 1}}, (err: any, otherinfo: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": otherinfo });
            }
        });
    }

    public addOtherinfo = (req: Request, res: Response) => {
        let otherinfo = new Otherinfo(req.body);

        otherinfo.ai =1;
        otherinfo.code = 'CO1';

        Otherinfo.findOne( {}, {}, {}, (err:any,result:IOtherinfo) => {
            if(result){
                otherinfo.ai =  result.ai + 1;
                otherinfo.code =  'CO' + otherinfo.ai;
            }

            otherinfo.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": otherinfo });
                }
            });

        }).sort({"ai":-1}).limit(1);

    };

    public updateOtherinfo = (req: Request, res: Response) => {
        let otherinfo = new Otherinfo(req.body);
        
            otherinfo.updateOne(otherinfo,(err: any) => {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": otherinfo });
                }
        });
    };

    public removeOtherinfo = (req: Request, res: Response) => {

        var otherinfo = new Otherinfo(req.body);


        Otherinfo.findByIdAndDelete(otherinfo.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": otherinfo });
            }
        });

    };

}

export const otherinfoController = new OtherinfoController ();
