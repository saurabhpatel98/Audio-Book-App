// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Academics, {IAcademics} from '../models/academics/academics'
import Course from "../models/course/course";

export class AcademicsController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let academics = Academics.find((err: any, academics: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": academics });
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

        let academics = Academics.findById(req.params.id, (err: any, academics: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": academics });
            }
        });
    }
    public findByType(req: Request, res: Response) {

        let academics = Academics.find({type : req.params.type}, (err: any, academics: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": academics });
            }
        });
    }

    public addAcademics = (req: Request, res: Response) => {
        let academics = new Academics(req.body);

        academics.ai =1;
        academics.code = 'CO1';

        Academics.findOne( {}, {}, {}, (err:any,result:IAcademics) => {
            if(result){
                academics.ai =  result.ai + 1;
                academics.code =  'CO' + academics.ai;
            }

            academics.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": academics });
                }
            });

        }).sort({"ai":-1}).limit(1);

    };

    public updateAcademics = (req: Request, res: Response) => {
        let academics = new Academics(req.body);
        
            academics.updateOne(academics,(err: any) => {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": academics });
                }
        });
    };

    public removeAcademics = (req: Request, res: Response) => {

        var academics = new Academics(req.body);


        Academics.findByIdAndDelete(academics.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": academics });
            }
        });

    };

}

export const academicsController = new AcademicsController ();
