// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Collegeplacements, {ICollegeplacements} from '../models/collegeplacements/collegeplacements'
import Course from "../models/course/course";

export class CollegeplacementsController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let collegeplacementss = Collegeplacements.find((err: any, collegeplacementss: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegeplacementss });
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

        let collegeplacements = Collegeplacements.findById(req.params.code, (err: any, collegeplacements: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegeplacements });
            }
        });
    }


    public addCollegeplacements = (req: Request, res: Response) => {
        let collegeplacements = new Collegeplacements(req.body);

        collegeplacements.ai =1;
        collegeplacements.code = 'FF1';
        Collegeplacements.findOne( {collegeid: req.body.collegeid, stream : req.body.stream, course : req.body.course, specialization : req.body.specialization}, (err:any,result:ICollegeplacements) => {
            if(!result){
                Collegeplacements.findOne( {}, {}, {}, (err:any,result:ICollegeplacements) => {
                    if(result){
                        collegeplacements.ai =  result.ai + 1;
                        collegeplacements.code =  'FF' + collegeplacements.ai;
                    }

                    collegeplacements.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegeplacements });
                        }
                    });

                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({"Error":"Course already exists."});
            }
        })

    };

    public updateCollegeplacements = (req: Request, res: Response) => {
        let collegeplacements = new Collegeplacements(req.body);
        Collegeplacements.findOne( {collegeid: req.body.collegeid, stream : req.body.stream, course : req.body.course, specialization : req.body.specialization}, (err:any,result:ICollegeplacements) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Course already exists."});
            }else{
                collegeplacements.updateOne(collegeplacements,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegeplacements });
                    }
                });
            }
        });
    };

    public removeCollegeplacements = (req: Request, res: Response) => {

        var collegeplacements = new Collegeplacements(req.body);


        Collegeplacements.findByIdAndDelete(collegeplacements.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegeplacements });
            }
        });

    };

}

export const collegeplacementsController = new CollegeplacementsController ();
