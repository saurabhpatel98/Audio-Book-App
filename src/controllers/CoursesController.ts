// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Courses, {ICourses} from '../models/courses/courses'
import Course from "../models/course/course";

export class CoursesController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let courses = Courses.find((err: any, courses: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": courses });
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

        let courses = Courses.findById(req.params.id, (err: any, courses: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": courses });
            }
        });
    }

    public findByName(req: Request, res: Response) {

        let courses = Courses.findOne({course : req.params.course}, (err: any, courses: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": courses });
            }
        });
    }

    public findByStream(req: Request, res: Response) {

        let courses = Courses.find({stream: req.params.stream}, (err: any, courses: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": courses });
            }
        });
    }


    public addCourses = (req: Request, res: Response) => {
        let courses = new Courses(req.body);

        courses.ai =1;
        courses.code = 'CO1';

        Courses.findOne( {course: req.body.course}, (err:any,result:ICourses) => {
            if(!result){
                Courses.findOne( {}, {}, {}, (err:any,result:ICourses) => {
                    if(result){
                        courses.ai =  result.ai + 1;
                        courses.code =  'CO' + courses.ai;
                    }

                    courses.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": courses });
                        }
                    });

                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({"Error":"Course already exists."});
            }
        });

    };

    public updateCourses = (req: Request, res: Response) => {
        let courses = new Courses(req.body);

        Courses.findOne( {course: req.body.course}, (err:any,result:ICourses) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Course already exists."});
            }else{
                courses.updateOne(courses,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": courses });
                    }
                });
            }
        });
    };

    public removeCourses = (req: Request, res: Response) => {

        var courses = new Courses(req.body);


        Courses.findByIdAndDelete(courses.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": courses });
            }
        });

    };

}

export const coursesController = new CoursesController ();
