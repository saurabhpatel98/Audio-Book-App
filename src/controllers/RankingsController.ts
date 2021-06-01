// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Rankings, {IRankings} from '../models/rankings/rankings'
import Courses, {ICourses} from '../models/courses/courses'
import Course from "../models/course/course";

export class RankingsController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let rankingss = Rankings.find((err: any, rankingss: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": rankingss });
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

        let rankings = Rankings.findById(req.params.id, (err: any, rankings: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": rankings });
            }
        });
    }


    public addRankings = (req: Request, res: Response) => {
        let rankings = new Rankings(req.body);

        rankings.ai =1;
        rankings.code = 'FF1';

        
                Rankings.findOne( {}, {}, {}, (err:any,result:IRankings) => {
                
                    if(result){
                        rankings.ai =  result.ai + 1;
                        rankings.code =  'FF' + rankings.ai;
                    }

                    rankings.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": rankings });
                        }
                    });

                }).sort({"ai":-1}).limit(1);
        


    };

    public updateRankings = (req: Request, res: Response) => {
        let rankings = new Rankings(req.body);

        
                rankings.updateOne(rankings,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": rankings });
                    }
                });
        
    };

    public removeRankings = (req: Request, res: Response) => {

        var rankings = new Rankings(req.body);


        Rankings.findByIdAndDelete(rankings.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": rankings });
            }
        });

    };

}

export const rankingsController = new RankingsController ();
