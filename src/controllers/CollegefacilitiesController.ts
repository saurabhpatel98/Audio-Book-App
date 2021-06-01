// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Collegefacilities, {ICollegefacilities} from '../models/collegefacilities/collegefacilities'
import Course from "../models/course/course";

export class CollegefacilitiesController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let collegefacilitiess = Collegefacilities.find((err: any, collegefacilitiess: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegefacilitiess });
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

        let collegefacilities = Collegefacilities.findById(req.params.code, (err: any, collegefacilities: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegefacilities });
            }
        });
    }


    public addCollegefacilities = (req: Request, res: Response) => {
        let collegefacilities = new Collegefacilities(req.body);

        collegefacilities.ai =1;
        collegefacilities.code = 'FF1';
        Collegefacilities.findOne( {collegeid: req.body.collegeid, stream : req.body.stream, course : req.body.course, specialization : req.body.specialization}, (err:any,result:ICollegefacilities) => {
            if(!result){
                Collegefacilities.findOne( {}, {}, {}, (err:any,result:ICollegefacilities) => {
                    if(result){
                        collegefacilities.ai =  result.ai + 1;
                        collegefacilities.code =  'FF' + collegefacilities.ai;
                    }

                    collegefacilities.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegefacilities });
                        }
                    });

                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({"Error":"Course already exists."});
            }
        })

    };

    public updateCollegefacilities = (req: Request, res: Response) => {
        let collegefacilities = new Collegefacilities(req.body);
        Collegefacilities.findOne( {collegeid: req.body.collegeid, stream : req.body.stream, course : req.body.course, specialization : req.body.specialization}, (err:any,result:ICollegefacilities) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Course already exists."});
            }else{
                collegefacilities.updateOne(collegefacilities,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegefacilities });
                    }
                });
            }
        });
    };

    public removeCollegefacilities = (req: Request, res: Response) => {

        var collegefacilities = new Collegefacilities(req.body);


        Collegefacilities.findByIdAndDelete(collegefacilities.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegefacilities });
            }
        });

    };

}

export const collegefacilitiesController = new CollegefacilitiesController ();
