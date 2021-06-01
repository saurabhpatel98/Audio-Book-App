// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Placements, {IPlacements} from '../models/placements/placements'
import Courses, {ICourses} from '../models/courses/courses'
import Course from "../models/course/course";

export class PlacementsController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let placementss = Placements.find((err: any, placementss: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placementss });
            }
        });
    }

    public findlimit12(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let placementss = Placements.find((err: any, placementss: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placementss });
            }
        }).limit(12);
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

        let placements = Placements.findById(req.params.id, (err: any, placements: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placements });
            }
        });
    }

    
    public findByCourseId(req: Request, res: Response) {

        let eligibility = Placements.find({course : {$in : req.params.id}}, (err: any, placements: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placements });
            }
        });
    }

    public findForExistingKey(req: Request, res: Response) {

        let eligibility = Placements.find({"name":{'$exists': 1}}, (err: any, eligibility: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": eligibility });
            }
        });
    }
    public findForExistingSectorKey(req: Request, res: Response) {

        let eligibility = Placements.find({sector : {$in : '$distinct'}}, (err: any, eligibility: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": eligibility });
            }
        });
    }

    public addPlacements = (req: Request, res: Response) => {
        let placements = new Placements(req.body);

        placements.ai =1;
        placements.code = 'FF1';

        Placements.findOne( {company : req.body.company},  (err:any,result:IPlacements) => {
            if(!result){
                Placements.findOne( {}, {}, {}, (err:any,result:IPlacements) => {
                
                    if(result){
                        placements.ai =  result.ai + 1;
                        placements.code =  'FF' + placements.ai;
                    }
                    if(req.body.course == ''){
                        delete req.body.course
                    }
                    placements.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placements });
                        }
                    });

                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({ "Error": 'Company Already Exists'});
            }
        })


    };

    public updatePlacements = (req: Request, res: Response) => {
        let placements = new Placements(req.body);

        Placements.findOne( {company : req.body.company}, (err:any,result:IPlacements) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Company Already Exists."});
            }else{
                placements.updateOne(placements,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placements });
                    }
                });
            }
        });

    };

    public removePlacements = (req: Request, res: Response) => {

        var placements = new Placements(req.body);


        Placements.findByIdAndDelete(placements.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placements });
            }
        });

    };

}

export const placementsController = new PlacementsController ();
