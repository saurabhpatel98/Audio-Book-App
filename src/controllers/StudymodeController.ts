// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Studymode, {IStudymode} from '../models/studymode/studymode'
import Course from "../models/course/course";

export class StudymodeController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let studymode = Studymode.find((err: any, studymode: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": studymode });
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

        let studymode = Studymode.findById(req.params.code, (err: any, studymode: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": studymode});
            }
        });
    }


    public addStudymode = (req: Request, res: Response) => {
        let studymode = new Studymode(req.body);

        studymode.ai =1;
        studymode.code = 'SM1';

        Studymode.findOne( {}, {}, {}, (err:any,result:IStudymode) => {
            if(result){
                studymode.ai =  result.ai + 1;
                studymode.code =  'SM' + studymode.ai;
            }

            studymode.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": studymode });
                }
            });

        }).sort({"ai":-1}).limit(1);


    };

    public updateStudymode = (req: Request, res: Response) => {
        let studymode = new Studymode(req.body);

        studymode.updateOne(studymode,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": studymode });
            }
        });

    };

    public removeStudymode = (req: Request, res: Response) => {

        var studymode = new Studymode(req.body);


        Studymode.findByIdAndDelete(studymode.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": studymode });
            }
        });

    };

}

export const studymodeController = new StudymodeController ();
