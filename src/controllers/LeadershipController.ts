// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Leadership, {ILeadership} from '../models/leadership/leadership'
import Courses, {ICourses} from '../models/courses/courses'
import Course from "../models/course/course";

export class LeadershipController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let leaderships = Leadership.find((err: any, leaderships: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": leaderships });
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

        let leadership = Leadership.findById(req.params.id, (err: any, leadership: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": leadership });
            }
        });
    }

    public findByDes(req: Request, res: Response) {

        let leadership = Leadership.findOne({designation : req.params.designation}, (err: any, leadership: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": leadership });
            }
        });
    }

    public findByType(req: Request, res: Response) {

        let leadership = Leadership.find({type : {$in : req.params.type}}, (err: any, leadership: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": leadership });
            }
        });
    }

    public addLeadership = (req: Request, res: Response) => {
        let leadership = new Leadership(req.body);

        leadership.ai =1;
        leadership.code = 'FF1';

        Leadership.findOne( {name : req.body.name},  (err:any,result:ILeadership) => {
            if(!result){
                Leadership.findOne( {}, {}, {}, (err:any,result:ILeadership) => {
                
                    if(result){
                        leadership.ai =  result.ai + 1;
                        leadership.code =  'FF' + leadership.ai;
                    }

                    leadership.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": leadership });
                        }
                    });

                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({ "Error": 'Semister Already Exists'});
            }
        })


    };

    public updateLeadership = (req: Request, res: Response) => {
        let leadership = new Leadership(req.body);

        Leadership.findOne( {name : req.body.name}, (err:any,result:ILeadership) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Semister Already Exists."});
            }else{
                leadership.updateOne(leadership,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": leadership });
                    }
                });
            }
        });

    };

    public removeLeadership = (req: Request, res: Response) => {

        var leadership = new Leadership(req.body);


        Leadership.findByIdAndDelete(leadership.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": leadership });
            }
        });

    };

}

export const leadershipController = new LeadershipController ();
