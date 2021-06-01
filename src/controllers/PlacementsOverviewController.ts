// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Placementsoverview, {IPlacementsoverview} from '../models/placements-overview/placementsoverview'
import Course from "../models/course/course";

export class PlacementsoverviewController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let placementsoverview = Placementsoverview.find((err: any, placementsoverview: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placementsoverview });
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

        let placementsoverview = Placementsoverview.findById(req.params.id, (err: any, placementsoverview: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placementsoverview });
            }
        });
    }
    public findByType(req: Request, res: Response) {

        let placementsoverview = Placementsoverview.find({type : req.params.type}, (err: any, placementsoverview: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placementsoverview });
            }
        });
    }

    public findOne(req: Request, res: Response) {

        let placementsoverview = Placementsoverview.findOne( (err: any, placementsoverview: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placementsoverview });
            }
        });
    }

    public addPlacementsoverview = (req: Request, res: Response) => {
        let placementsoverview = new Placementsoverview(req.body);

        placementsoverview.ai =1;
        placementsoverview.code = 'CO1';

        Placementsoverview.findOne( {}, {}, {}, (err:any,result:IPlacementsoverview) => {
            if(result){
                placementsoverview.ai =  result.ai + 1;
                placementsoverview.code =  'CO' + placementsoverview.ai;
            }

            placementsoverview.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placementsoverview });
                }
            });

        }).sort({"ai":-1}).limit(1);

    };

    public updatePlacementsoverview = (req: Request, res: Response) => {
        let placementsoverview = new Placementsoverview(req.body);
        
            placementsoverview.updateOne(placementsoverview,(err: any) => {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placementsoverview });
                }
        });
    };

    public removePlacementsoverview = (req: Request, res: Response) => {

        var placementsoverview = new Placementsoverview(req.body);


        Placementsoverview.findByIdAndDelete(placementsoverview.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placementsoverview });
            }
        });

    };

}

export const placementsoverviewController = new PlacementsoverviewController ();
