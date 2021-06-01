// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Moredetails, {IMoredetails} from '../models/moredetails/moredetails'
import Courses, {ICourses} from '../models/courses/courses'
import Course from "../models/course/course";

export class MoredetailsController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let moredetailss = Moredetails.find((err: any, moredetailss: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": moredetailss });
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

        let moredetails = Moredetails.findById(req.params.id, (err: any, moredetails: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": moredetails });
            }
        });
    }

    public findByCourseId(req: Request, res: Response) {

        let eligibility = Moredetails.find({course : req.params.id}, (err: any, moredetails: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": moredetails });
            }
        });
    }


    public addMoredetails = (req: Request, res: Response) => {
        let moredetails = new Moredetails(req.body);

        moredetails.ai =1;
        moredetails.code = 'FF1';

        
        Moredetails.findOne( {}, {}, {}, (err:any,result:IMoredetails) => {
        
            if(result){
                moredetails.ai =  result.ai + 1;
                moredetails.code =  'FF' + moredetails.ai;
            }

            moredetails.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": moredetails });
                }
            });

        }).sort({"ai":-1}).limit(1);
        


    };

    public updateMoredetails = (req: Request, res: Response) => {
        let moredetails = new Moredetails(req.body);

        
        moredetails.updateOne(moredetails,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": moredetails });
            }
        });
        

    };

    public removeMoredetails = (req: Request, res: Response) => {

        var moredetails = new Moredetails(req.body);


        Moredetails.findByIdAndDelete(moredetails.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": moredetails });
            }
        });

    };

}

export const moredetailsController = new MoredetailsController ();
