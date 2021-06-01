// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Advancedengineering, {IAdvancedengineering} from '../models/advancedengineering/advancedengineering'
import Courses, {ICourses} from '../models/courses/courses'
import Course from "../models/course/course";

export class AdvancedengineeringController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let advancedengineerings = Advancedengineering.find((err: any, advancedengineerings: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": advancedengineerings });
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

        let advancedengineering = Advancedengineering.findById(req.params.id, (err: any, advancedengineering: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": advancedengineering });
            }
        });
    }


    public addAdvancedengineering = (req: Request, res: Response) => {
        let advancedengineering = new Advancedengineering(req.body);

        advancedengineering.ai =1;
        advancedengineering.code = 'FF1';

        Advancedengineering.findOne( {heading : req.body.heading},  (err:any,result:IAdvancedengineering) => {
            if(!result){
                Advancedengineering.findOne( {}, {}, {}, (err:any,result:IAdvancedengineering) => {
                
                    if(result){
                        advancedengineering.ai =  result.ai + 1;
                        advancedengineering.code =  'FF' + advancedengineering.ai;
                    }

                    advancedengineering.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": advancedengineering });
                        }
                    });

                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({ "Error": 'Semister Already Exists'});
            }
        })


    };

    public updateAdvancedengineering = (req: Request, res: Response) => {
        let advancedengineering = new Advancedengineering(req.body);

        Advancedengineering.findOne( {heading : req.body.heading}, (err:any,result:IAdvancedengineering) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Semister Already Exists."});
            }else{
                advancedengineering.updateOne(advancedengineering,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": advancedengineering });
                    }
                });
            }
        });

    };

    public removeAdvancedengineering = (req: Request, res: Response) => {

        var advancedengineering = new Advancedengineering(req.body);


        Advancedengineering.findByIdAndDelete(req.params.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": advancedengineering });
            }
        });

    };

}

export const advancedengineeringController = new AdvancedengineeringController ();
