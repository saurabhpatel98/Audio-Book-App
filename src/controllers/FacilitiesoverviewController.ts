// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Facilitiesoverview, {IFacilitiesoverview} from '../models/facilitiesoverview/facilitiesoverview'
import Course from "../models/course/course";

export class FacilitiesoverviewController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let facilitiesoverview = Facilitiesoverview.find((err: any, facilitiesoverview: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": facilitiesoverview });
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

        let facilitiesoverview = Facilitiesoverview.findById(req.params.id, (err: any, facilitiesoverview: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": facilitiesoverview });
            }
        });
    }
    public findByFacility(req: Request, res: Response) {

        let facilitiesoverview = Facilitiesoverview.find({facility : req.params.facility}, (err: any, facilitiesoverview: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": facilitiesoverview });
            }
        });
    }

    public addFacilitiesoverview = (req: Request, res: Response) => {
        let facilitiesoverview = new Facilitiesoverview(req.body);

        facilitiesoverview.ai =1;
        facilitiesoverview.code = 'CO1';

        Facilitiesoverview.findOne( {}, {}, {}, (err:any,result:IFacilitiesoverview) => {
            if(result){
                facilitiesoverview.ai =  result.ai + 1;
                facilitiesoverview.code =  'CO' + facilitiesoverview.ai;
            }

            facilitiesoverview.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": facilitiesoverview });
                }
            });

        }).sort({"ai":-1}).limit(1);

    };

    public updateFacilitiesoverview = (req: Request, res: Response) => {
        let facilitiesoverview = new Facilitiesoverview(req.body);
        
            facilitiesoverview.updateOne(facilitiesoverview,(err: any) => {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": facilitiesoverview });
                }
        });
    };

    public removeFacilitiesoverview = (req: Request, res: Response) => {

        var facilitiesoverview = new Facilitiesoverview(req.body);


        Facilitiesoverview.findByIdAndDelete(facilitiesoverview.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": facilitiesoverview });
            }
        });

    };

}

export const facilitiesoverviewController = new FacilitiesoverviewController ();
