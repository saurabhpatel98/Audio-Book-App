// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Faculty, {IFaculty} from '../models/faculty/faculty'
import Course from "../models/course/course";

export class FacultyController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let faculty = Faculty.find((err: any, faculty: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": faculty });
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

        let faculty = Faculty.findById(req.params.id, (err: any, faculty: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": faculty });
            }
        });
    }
    public findByDepartment(req: Request, res: Response) {

        let faculty = Faculty.find({department : req.params.department}, (err: any, faculty: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": faculty });
            }
        });
    }
    public findByFaculty(req: Request, res: Response) {

        let faculty = Faculty.find({name : req.params.name}, (err: any, faculty: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": faculty });
            }
        });
    }

    public addFaculty = (req: Request, res: Response) => {
        let faculty = new Faculty(req.body);

        faculty.ai =1;
        faculty.code = 'CO1';

        Faculty.findOne( {}, {}, {}, (err:any,result:IFaculty) => {
            if(result){
                faculty.ai =  result.ai + 1;
                faculty.code =  'CO' + faculty.ai;
            }

            faculty.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": faculty });
                }
            });

        }).sort({"ai":-1}).limit(1);

    };

    public updateFaculty = (req: Request, res: Response) => {
        let faculty = new Faculty(req.body);
        
            faculty.updateOne(faculty,(err: any) => {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": faculty });
                }
        });
    };

    public removeFaculty = (req: Request, res: Response) => {

        var faculty = new Faculty(req.body);


        Faculty.findByIdAndDelete(faculty.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": faculty });
            }
        });

    };

}

export const facultyController = new FacultyController ();
