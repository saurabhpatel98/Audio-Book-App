// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Eligibility, {IEligibility} from '../models/eligibility/eligibility'
import Courses, {ICourses} from '../models/courses/courses'
import Course from "../models/course/course";

export class EligibilityController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let eligibilitys = Eligibility.find((err: any, eligibilitys: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": eligibilitys });
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

        let eligibility = Eligibility.findById(req.params.id, (err: any, eligibility: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": eligibility });
            }
        });
    }

    public findByCourseId(req: Request, res: Response) {

        let eligibility = Eligibility.find({course : req.params.id}, (err: any, eligibility: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": eligibility });
            }
        });
    }


    public addEligibility = (req: Request, res: Response) => {
        let eligibility = new Eligibility(req.body);

        eligibility.ai =1;
        eligibility.code = 'FF1';

        Eligibility.findOne( {course : req.body.course},  (err:any,result:IEligibility) => {
            if(!result){
                Eligibility.findOne( {}, {}, {}, (err:any,result:IEligibility) => {
                
                    if(result){
                        eligibility.ai =  result.ai + 1;
                        eligibility.code =  'FF' + eligibility.ai;
                    }

                    eligibility.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": eligibility });
                        }
                    });

                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({ "Error": 'Semister Already Exists'});
            }
        })


    };

    public updateEligibility = (req: Request, res: Response) => {
        let eligibility = new Eligibility(req.body);

        Eligibility.findOne( {course : req.body.course}, (err:any,result:IEligibility) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Semister Already Exists."});
            }else{
                eligibility.updateOne(eligibility,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": eligibility });
                    }
                });
            }
        });

    };

    public removeEligibility = (req: Request, res: Response) => {

        var eligibility = new Eligibility(req.body);


        Eligibility.findByIdAndDelete(eligibility.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": eligibility });
            }
        });

    };

}

export const eligibilityController = new EligibilityController ();
