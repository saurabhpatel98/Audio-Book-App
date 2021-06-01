// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Collegeinfo, {ICollegeinfo} from '../models/collegeinfo/collegeinfo'
import Primarycontact, {IPrimarycontact} from '../models/primarycontact/primarycontact'
import Course from "../models/course/course";
import Collegecourses, {ICollegecourses} from '../models/collegecourses/collegecourses'
import * as mongoose from "mongoose";

export class CollegeinfoController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let cities = Collegeinfo.find((err: any, cities: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": cities });
            }
        });
    }


    public findAllFromCollegeinfo(req: Request, res: Response) {

        const code = req.params.collegeid;

        Collegeinfo.aggregate([
            { "$lookup": {
                "from": 'collegecourses',
                "localField": 'collegeid',
                "foreignField": 'collegeid',
                "as": "courses"
            }},
        ],function(err,result) {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": result});
            }
        });
    }

    public findByCode(req: Request, res: Response) {
        
        let collegeinfo = Collegeinfo.findById(req.params.id, (err: any, collegeinfo: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegeinfo });
            }
        });
    }

    public findByCollegeId(req: Request, res: Response) {
        
        let collegeinfo = Collegeinfo.findOne({collegeid: req.params.collegeid}, (err: any, collegeinfo: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegeinfo });
            }
        });
    }

    public addCollegeinfo = (req: Request, res: Response) => {
        let collegeinfo = new Collegeinfo(req.body);
        let primarycontact = new Primarycontact(req.body);

        collegeinfo.ai =1;
        collegeinfo.code = 'CC1';

        Collegeinfo.findOne( {collegeid: req.body.collegeid}, (err:any,result:ICollegeinfo) => {
            if(!result){
                Collegeinfo.findOne( {}, {}, {}, (err:any,result:ICollegeinfo) => {
                    if(result){
                        collegeinfo.ai =  result.ai + 1;
                        collegeinfo.code =  'CC' + collegeinfo.ai;
                    }
                    collegeinfo.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            // res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": primarycontact });
                            primarycontact.save((err: any) => {

                                if (err) {
                                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                                } else {
                                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": primarycontact });
                                }
                            });
                        }
                    });
                    
                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({"Error":"Collegeinfo already exists1."});
            }
        });

    };

    public updateCollegeinfo = (req: Request, res: Response) => {
        let collegeinfo = new Collegeinfo(req.body);

        collegeinfo.updateOne(collegeinfo,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegeinfo });
            }
        });

    };

    public removeCollegeinfo = (req: Request, res: Response) => {

        var collegeinfo = new Collegeinfo(req.body);


        Collegeinfo.findByIdAndDelete(collegeinfo.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegeinfo });
            }
        });

    };

}

export const collegeinfoController = new CollegeinfoController ();
