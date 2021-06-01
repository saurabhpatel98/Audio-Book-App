// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Studentstories, {IStudentstories} from '../models/studentstories/studentstories'
import Courses, {ICourses} from '../models/courses/courses'
import Course from "../models/course/course";

export class StudentstoriesController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let studentstoriess = Studentstories.find((err: any, studentstoriess: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": studentstoriess });
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

        let studentstories = Studentstories.findById(req.params.id, (err: any, studentstories: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": studentstories });
            }
        });
    }


    public addStudentstories = (req: Request, res: Response) => {
        let studentstories = new Studentstories(req.body);

        studentstories.ai =1;
        studentstories.code = 'FF1';

        
        if(req.body.priority != ''){
            Studentstories.findOne( {priority : req.body.priority}, (err:any,result:IStudentstories) => {
                if(result){
                    res.send({ "Error": 'Priority Already Exists'});
                }else{
                    Studentstories.findOne( {}, {}, {}, (err:any,result:IStudentstories) => {
                        if(result){
                            studentstories.ai =  result.ai + 1;
                            studentstories.code =  'CC' + studentstories.ai;
                        }
                        studentstories.save((err: any) => {
        
                            if (err) {
                                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                            } else {
                                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": studentstories });
                            }
                        });
                        
                    }).sort({"ai":-1}).limit(1);
                }
            })
        }else{
            Studentstories.findOne( {}, {}, {}, (err:any,result:IStudentstories) => {
                if(result){
                    studentstories.ai =  result.ai + 1;
                    studentstories.code =  'CC' + studentstories.ai;
                }
                studentstories.save((err: any) => {

                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": studentstories });
                    }
                });
                
            }).sort({"ai":-1}).limit(1);
        }

    };

    public updateStudentstories = (req: Request, res: Response) => {
        let studentstories = new Studentstories(req.body);

        if(req.body.priority != ''){
            Studentstories.findOne( {priority : req.body.priority}, (err:any,result:IStudentstories) => {
                if(result && req.body._id != result._id){
                    res.send({ "Error": 'Priority Already Exists'});
                }else{
                    studentstories.updateOne(studentstories,(err: any) => {
                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": studentstories });
                        }
                    });
                }
            });
        }else{
            Studentstories.updateOne(studentstories,(err: any) => {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": studentstories });
                }
            });
        }

    };

    public removeStudentstories = (req: Request, res: Response) => {

        var studentstories = new Studentstories(req.body);


        Studentstories.findByIdAndDelete(studentstories.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": studentstories });
            }
        });

    };

}

export const studentstoriesController = new StudentstoriesController ();
