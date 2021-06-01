// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Studentsplaced, {IStudentsplaced} from '../models/students-placed/students-placed'
import Course from "../models/course/course";

export class StudentsplacedController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let studentsplaced = Studentsplaced.find((err: any, studentsplaced: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": studentsplaced });
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

        let studentsplaced = Studentsplaced.findById(req.params.id, (err: any, studentsplaced: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": studentsplaced });
            }
        });
    }

    public addStudentsplaced = (req: Request, res: Response) => {
        let studentsplaced = new Studentsplaced(req.body);

        studentsplaced.ai =1;
        studentsplaced.code = 'CO1';

        Studentsplaced.findOne( {}, {}, {}, (err:any,result:IStudentsplaced) => {
            if(result){
                studentsplaced.ai =  result.ai + 1;
                studentsplaced.code =  'CO' + studentsplaced.ai;
            }

            studentsplaced.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": studentsplaced });
                }
            });

        }).sort({"ai":-1}).limit(1);

    };

    public updateStudentsplaced = (req: Request, res: Response) => {
        let studentsplaced = new Studentsplaced(req.body);
        
            studentsplaced.updateOne(studentsplaced,(err: any) => {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": studentsplaced });
                }
        });
    };

    public removeStudentsplaced = (req: Request, res: Response) => {

        var studentsplaced = new Studentsplaced(req.body);


        Studentsplaced.findByIdAndDelete(studentsplaced.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": studentsplaced });
            }
        });

    };

}

export const studentsplacedController = new StudentsplacedController ();
