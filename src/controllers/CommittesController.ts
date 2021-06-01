// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Committes, {ICommittes} from '../models/committes/committes'
import Courses, {ICourses} from '../models/courses/courses'
import Course from "../models/course/course";

export class CommittesController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let committess = Committes.find((err: any, committess: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": committess });
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

        let committes = Committes.findById(req.params.id, (err: any, committes: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": committes });
            }
        });
    }


    public addCommittes = (req: Request, res: Response) => {
        let committes = new Committes(req.body);

        committes.ai =1;
        committes.code = 'FF1';

        Committes.findOne( {name : req.body.name},  (err:any,result:ICommittes) => {
            if(!result){
                Committes.findOne( {}, {}, {}, (err:any,result:ICommittes) => {
                
                    if(result){
                        committes.ai =  result.ai + 1;
                        committes.code =  'FF' + committes.ai;
                    }

                    committes.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": committes });
                        }
                    });

                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({ "Error": 'Semister Already Exists'});
            }
        })


    };

    public updateCommittes = (req: Request, res: Response) => {
        let committes = new Committes(req.body);

        Committes.findOne( {name : req.body.name}, (err:any,result:ICommittes) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Semister Already Exists."});
            }else{
                committes.updateOne(committes,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": committes });
                    }
                });
            }
        });

    };

    public removeCommittes = (req: Request, res: Response) => {

        var committes = new Committes(req.body);


        Committes.findByIdAndDelete(committes.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": committes });
            }
        });

    };

}

export const committesController = new CommittesController ();
