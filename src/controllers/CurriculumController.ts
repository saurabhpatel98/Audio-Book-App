// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Curriculum, {ICurriculum} from '../models/curriculum/curriculum'
import Courses, {ICourses} from '../models/courses/courses'
import Course from "../models/course/course";

export class CurriculumController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let curriculums = Curriculum.find((err: any, curriculums: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": curriculums });
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

        let curriculum = Curriculum.findById(req.params.id, (err: any, curriculum: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": curriculum });
            }
        });
    }

    public findByCourseId(req: Request, res: Response) {

        let eligibility = Curriculum.find({course : req.params.id}, (err: any, curriculum: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": curriculum });
            }
        });
    }


    public addCurriculum = (req: Request, res: Response) => {
        let curriculum = new Curriculum(req.body);

        curriculum.ai =1;
        curriculum.code = 'FF1';

        Curriculum.findOne( {course : req.body.course, year: req.body.year},  (err:any,result:ICurriculum) => {
            if(!result){
                Curriculum.findOne( {}, {}, {}, (err:any,result:ICurriculum) => {
                
                    if(result){
                        curriculum.ai =  result.ai + 1;
                        curriculum.code =  'FF' + curriculum.ai;
                    }

                    curriculum.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": curriculum });
                        }
                    });

                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({ "Error": 'Semister Already Exists'});
            }
        })


    };

    public updateCurriculum = (req: Request, res: Response) => {
        let curriculum = new Curriculum(req.body);

        Curriculum.findOne( {course : req.body.course, year: req.body.year}, (err:any,result:ICurriculum) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Semister Already Exists."});
            }else{
                curriculum.updateOne(curriculum,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": curriculum });
                    }
                });
            }
        });

    };

    public removeCurriculum = (req: Request, res: Response) => {

        var curriculum = new Curriculum(req.body);


        Curriculum.findByIdAndDelete(curriculum.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": curriculum });
            }
        });

    };

}

export const curriculumController = new CurriculumController ();
