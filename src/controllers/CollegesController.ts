// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Colleges, {IColleges} from '../models/colleges/colleges'
import Course from "../models/course/course";

export class CollegesController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let colleges = Colleges.find((err: any, colleges: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": colleges });
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

        let colleges = Colleges.findById(req.params.code, (err: any, colleges: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": colleges });
            }
        });
    }


    public addColleges = (req: Request, res: Response) => {
        let colleges = new Colleges(req.body);

        colleges.ai =1;
        colleges.code = 'CC1';

        Colleges.findOne( {email: req.body.email}, (err:any,result:IColleges) => {
            if(!result){
                Colleges.findOne( {}, {}, {}, (err:any,result:IColleges) => {
                    if(result){
                        colleges.ai =  result.ai + 1;
                        colleges.code =  'CC' + colleges.ai;
                    }

                    colleges.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": colleges });
                        }
                    });

                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({"Error":"Email is already registered."});
            }
        });


    };

    public updateColleges = (req: Request, res: Response) => {
        let colleges = new Colleges(req.body);

        colleges.updateOne(colleges,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": colleges });
            }
        });

    };

    public removeColleges = (req: Request, res: Response) => {

        var colleges = new Colleges(req.body);


        Colleges.findByIdAndDelete(colleges.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": colleges });
            }
        });

    };

}

export const collegesController = new CollegesController ();
