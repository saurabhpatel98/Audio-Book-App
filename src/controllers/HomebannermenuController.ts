// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Homebannermenu, {IHomebannermenu} from '../models/homebannermenu/homebannermenu'
import Courses, {ICourses} from '../models/courses/courses'
import Course from "../models/course/course";

export class HomebannermenuController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let homebannermenus = Homebannermenu.find((err: any, homebannermenus: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": homebannermenus });
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

        let homebannermenu = Homebannermenu.findOne( (err: any, homebannermenu: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": homebannermenu });
            }
        });
    }


    public addHomebannermenu = (req: Request, res: Response) => {
        let homebannermenu = new Homebannermenu(req.body);

        homebannermenu.ai =1;
        homebannermenu.code = 'FF1';
        
        Homebannermenu.findOne( {}, {}, {}, (err:any,result:IHomebannermenu) => {
        
            if(result){
                homebannermenu.ai =  result.ai + 1;
                homebannermenu.code =  'FF' + homebannermenu.ai;
            }

            homebannermenu.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": homebannermenu });
                }
            });

        }).sort({"ai":-1}).limit(1);
        


    };

    public updateHomebannermenu = (req: Request, res: Response) => {
        let homebannermenu = new Homebannermenu(req.body);

        
        homebannermenu.updateOne(homebannermenu,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": homebannermenu });
            }
        });
        

    };

    public removeHomebannermenu = (req: Request, res: Response) => {

        var homebannermenu = new Homebannermenu(req.body);


        Homebannermenu.findByIdAndDelete(homebannermenu.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": homebannermenu });
            }
        });

    };

}

export const homebannermenuController = new HomebannermenuController ();
