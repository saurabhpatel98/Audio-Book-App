// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Courseslevel, {ICourseslevel} from '../models/courseslevel/courseslevel'
import Course from "../models/course/course";

export class CourseslevelController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let courseslevel = Courseslevel.find((err: any, courseslevel: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": courseslevel });
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

        let courseslevel = Courseslevel.findById(req.params.code, (err: any, courseslevel: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": courseslevel});
            }
        });
    }


    public addCourseslevel = (req: Request, res: Response) => {
        let courseslevel = new Courseslevel(req.body);

        courseslevel.ai =1;
        courseslevel.code = 'CL1';

        Courseslevel.findOne( {}, {}, {}, (err:any,result:ICourseslevel) => {
            if(result){
                courseslevel.ai =  result.ai + 1;
                courseslevel.code =  'CL' + courseslevel.ai;
            }

            courseslevel.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": courseslevel });
                }
            });

        }).sort({"ai":-1}).limit(1);


    };

    public updateCourseslevel = (req: Request, res: Response) => {
        let courseslevel = new Courseslevel(req.body);

        courseslevel.updateOne(courseslevel,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": courseslevel });
            }
        });

    };

    public removeCourseslevel = (req: Request, res: Response) => {

        var courseslevel = new Courseslevel(req.body);


        Courseslevel.findByIdAndDelete(courseslevel.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": courseslevel });
            }
        });

    };

}

export const courseslevelController = new CourseslevelController ();
