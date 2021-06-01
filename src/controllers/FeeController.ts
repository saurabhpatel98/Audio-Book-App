// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Fee, {IFee} from '../models/fee/fee'
import Courses, {ICourses} from '../models/courses/courses'
import Course from "../models/course/course";

export class FeeController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let fees = Fee.find((err: any, fees: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": fees });
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

        let fee = Fee.findById(req.params.id, (err: any, fee: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": fee });
            }
        });
    }

    public findByCourseId(req: Request, res: Response) {

        let eligibility = Fee.findOne({course : req.params.id}, (err: any, fee: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": fee });
            }
        });
    }


    public addFee = (req: Request, res: Response) => {
        let fee = new Fee(req.body);

        fee.ai =1;
        fee.code = 'FF1';

        Fee.findOne( {course : req.body.course},  (err:any,result:IFee) => {
            if(!result){
                Fee.findOne( {}, {}, {}, (err:any,result:IFee) => {
                
                    if(result){
                        fee.ai =  result.ai + 1;
                        fee.code =  'FF' + fee.ai;
                    }

                    fee.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": fee });
                        }
                    });

                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({ "Error": 'Fees Already Exists'});
            }
        })


    };

    public updateFee = (req: Request, res: Response) => {
        let fee = new Fee(req.body);

        Fee.findOne( {course : req.body.course}, (err:any,result:IFee) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Course Already Exists."});
            }else{
                fee.updateOne(fee,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": fee });
                    }
                });
            }
        });

    };

    public removeFee = (req: Request, res: Response) => {

        var fee = new Fee(req.body);


        Fee.findByIdAndDelete(fee.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": fee });
            }
        });

    };

}

export const feeController = new FeeController ();
