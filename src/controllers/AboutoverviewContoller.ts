// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Aboutoverview, {IAboutoverview} from '../models/aboutoverview/aboutoverview'
import Courses, {ICourses} from '../models/courses/courses'
import Course from "../models/course/course";

export class AboutoverviewController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let aboutoverviews = Aboutoverview.find((err: any, aboutoverviews: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": aboutoverviews });
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

    public findOne(req: Request, res: Response) {

        let aboutoverview = Aboutoverview.findOne( (err: any, aboutoverview: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": aboutoverview });
            }
        });
    }


    public addAboutoverview = (req: Request, res: Response) => {
        let aboutoverview = new Aboutoverview(req.body);

        aboutoverview.ai =1;
        aboutoverview.code = 'FF1';
        
        Aboutoverview.findOne( {}, {}, {}, (err:any,result:IAboutoverview) => {
        
            if(result){
                aboutoverview.ai =  result.ai + 1;
                aboutoverview.code =  'FF' + aboutoverview.ai;
            }

            aboutoverview.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": aboutoverview });
                }
            });

        }).sort({"ai":-1}).limit(1);
        


    };

    public updateAboutoverview = (req: Request, res: Response) => {
        let aboutoverview = new Aboutoverview(req.body);

        
        aboutoverview.updateOne(aboutoverview,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": aboutoverview });
            }
        });
        

    };

    public removeAboutoverview = (req: Request, res: Response) => {

        var aboutoverview = new Aboutoverview(req.body);


        Aboutoverview.findByIdAndDelete(aboutoverview.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": aboutoverview });
            }
        });

    };

}

export const aboutoverviewController = new AboutoverviewController ();
