// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Exams, {IExams} from '../models/exams/exams'
import Primarycontact, {IPrimarycontact} from '../models/primarycontact/primarycontact'
import Course from "../models/course/course";
import Collegecourses, {ICollegecourses} from '../models/collegecourses/collegecourses'
import * as mongoose from "mongoose";

export class ExamsController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let cities = Exams.find((err: any, cities: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": cities });
            }
        });
    }

    public findByCode(req: Request, res: Response) {
        
        let exams = Exams.findById(req.params.id, (err: any, exams: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": exams });
            }
        });
    }

    public addExams = (req: Request, res: Response) => {
        let exams = new Exams(req.body);
        let primarycontact = new Primarycontact(req.body);

        exams.ai =1;
        exams.code = 'CC1';

            Exams.findOne( {}, {}, {}, (err:any,result:IExams) => {
                if(result){
                    exams.ai =  result.ai + 1;
                    exams.code =  'CC' + exams.ai;
                }
                exams.save((err: any) => {

                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": primarycontact });
                    }
                });
                
            }).sort({"ai":-1}).limit(1);

    };

    public updateExams = (req: Request, res: Response) => {
        let exams = new Exams(req.body);

        exams.updateOne(exams,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": exams });
            }
        });

    };

    public removeExams = (req: Request, res: Response) => {

        var exams = new Exams(req.body);


        Exams.findByIdAndDelete(exams.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": exams });
            }
        });

    };

}

export const examsController = new ExamsController ();
