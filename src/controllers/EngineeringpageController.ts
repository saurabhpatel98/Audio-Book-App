// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Engineeringpage, {IEngineeringpage} from '../models/engineeringpage/engineeringpage'
import Courses, {ICourses} from '../models/courses/courses'
import Course from "../models/course/course";

export class EngineeringpageController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let engineeringpages = Engineeringpage.find((err: any, engineeringpages: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": engineeringpages });
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

        let engineeringpage = Engineeringpage.findOne( (err: any, engineeringpage: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": engineeringpage });
            }
        });
    }


    public addEngineeringpage = (req: Request, res: Response) => {
        let engineeringpage = new Engineeringpage(req.body);

        engineeringpage.ai =1;
        engineeringpage.code = 'FF1';
        
        Engineeringpage.findOne( {}, {}, {}, (err:any,result:IEngineeringpage) => {
        
            if(result){
                engineeringpage.ai =  result.ai + 1;
                engineeringpage.code =  'FF' + engineeringpage.ai;
            }

            engineeringpage.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": engineeringpage });
                }
            });

        }).sort({"ai":-1}).limit(1);
        


    };

    public updateEngineeringpage = (req: Request, res: Response) => {
        let engineeringpage = new Engineeringpage(req.body);

        
        engineeringpage.updateOne(engineeringpage,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": engineeringpage });
            }
        });
        

    };

    public removeEngineeringpage = (req: Request, res: Response) => {

        var engineeringpage = new Engineeringpage(req.body);


        Engineeringpage.findByIdAndDelete(engineeringpage.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": engineeringpage });
            }
        });

    };

}

export const engineeringpageController = new EngineeringpageController ();
