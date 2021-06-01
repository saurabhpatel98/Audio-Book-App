// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Campusoverview, {ICampusoverview} from '../models/campusoverview/campusoverview'
import Courses, {ICourses} from '../models/courses/courses'
import Course from "../models/course/course";

export class CampusoverviewController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let campusoverviews = Campusoverview.find((err: any, campusoverviews: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": campusoverviews });
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

        let campusoverview = Campusoverview.findOne( (err: any, campusoverview: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": campusoverview });
            }
        });
    }


    public addCampusoverview = (req: Request, res: Response) => {
        let campusoverview = new Campusoverview(req.body);

        campusoverview.ai =1;
        campusoverview.code = 'FF1';
        
        Campusoverview.findOne( {}, {}, {}, (err:any,result:ICampusoverview) => {
        
            if(result){
                campusoverview.ai =  result.ai + 1;
                campusoverview.code =  'FF' + campusoverview.ai;
            }

            campusoverview.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": campusoverview });
                }
            });

        }).sort({"ai":-1}).limit(1);
        


    };

    public updateCampusoverview = (req: Request, res: Response) => {
        let campusoverview = new Campusoverview(req.body);

        
        campusoverview.updateOne(campusoverview,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": campusoverview });
            }
        });
        

    };

    public removeCampusoverview = (req: Request, res: Response) => {

        var campusoverview = new Campusoverview(req.body);


        Campusoverview.findByIdAndDelete(campusoverview.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": campusoverview });
            }
        });

    };

}

export const campusoverviewController = new CampusoverviewController ();
