// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Homeranksection, {IHomeranksection} from '../models/homeranksection/homeranksection'
import Courses, {ICourses} from '../models/courses/courses'
import Course from "../models/course/course";

export class HomeranksectionController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let homeranksections = Homeranksection.find((err: any, homeranksections: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": homeranksections });
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

        let homeranksection = Homeranksection.findOne( (err: any, homeranksection: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": homeranksection });
            }
        });
    }

    public findById(req: Request, res: Response) {

        let homeranksection = Homeranksection.findById(req.params.id, (err: any, homeranksection: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": homeranksection });
            }
        });
    }


    public addHomeranksection = (req: Request, res: Response) => {
        let homeranksection = new Homeranksection(req.body);

        homeranksection.ai =1;
        homeranksection.code = 'FF1';
        
        Homeranksection.findOne( {}, {}, {}, (err:any,result:IHomeranksection) => {
        
            if(result){
                homeranksection.ai =  result.ai + 1;
                homeranksection.code =  'FF' + homeranksection.ai;
            }

            homeranksection.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": homeranksection });
                }
            });

        }).sort({"ai":-1}).limit(1);
        


    };

    public updateHomeranksection = (req: Request, res: Response) => {
        let homeranksection = new Homeranksection(req.body);

        
        homeranksection.updateOne(homeranksection,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": homeranksection });
            }
        });
        

    };

    public removeHomeranksection = (req: Request, res: Response) => {

        var homeranksection = new Homeranksection(req.body);


        Homeranksection.findByIdAndDelete(homeranksection.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": homeranksection });
            }
        });

    };

}

export const homeranksectionController = new HomeranksectionController ();
