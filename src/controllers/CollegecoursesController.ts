// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Collegecourses, {ICollegecourses} from '../models/collegecourses/collegecourses'
import Primarycontact, {IPrimarycontact} from '../models/primarycontact/primarycontact'
import Course from "../models/course/course";

export class CollegecoursesController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let cities = Collegecourses.find((err: any, cities: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": cities });
            }
        });
       /*  Collegecourses.aggregate([
            { "$lookup": {
                "from": 'colleges',
                "localField": 'collegeid',
                "foreignField": '_id',
                "as": "collegename"
            }},
            { "$unwind": "$collegeid" },
            { "$group": {
                "_id": "$collegeid",
                "collegename": {
                    "$push": {
                        "_id": "$_id",
                        "stream": "$stream",
                        "course": "$course",
                        "specialization": "$specialization",
                        "seats": "$seats",
                        "scholarship": "$scholarship",
                        "scholarshipamt": "$scholarshipamt",
                        "fees": "$fees",
                        "college": "$collegename.name",
                    }
                }
            }},
            { "$unwind": "$collegename" },
        ],function(err,result) {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": result});
            }
        }); */
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

    public findByCode(req: Request, res: Response) {
        
        let collegecourses = Collegecourses.findById(req.params.id, (err: any, collegecourses: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegecourses });
            }
        });
    }

    public addCollegecourses = (req: Request, res: Response) => {
        let collegecourses = new Collegecourses(req.body);

        collegecourses.ai =1;
        collegecourses.code = 'CC1';
        
        Collegecourses.findOne( {collegeid: req.body.collegeid, stream : req.body.stream, course : req.body.course, specialization : req.body.specialization}, (err:any,result:ICollegecourses) => {
            if(!result){
            Collegecourses.findOne( {}, {}, {}, (err:any,result:ICollegecourses) => {
                if(result){
                    collegecourses.ai =  result.ai + 1;
                    collegecourses.code =  'CC' + collegecourses.ai;
                }
                collegecourses.save((err: any) => {

                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegecourses });
                    }
                });
            }).sort({"ai":-1}).limit(1);
            }else{
                res.send({"Error":"Course already exists."});
            }
        })
    };

    public updateCollegecourses = (req: Request, res: Response) => {
        let collegecourses = new Collegecourses(req.body);

        Collegecourses.findOne( {collegeid: req.body.collegeid, stream : req.body.stream, course : req.body.course, specialization : req.body.specialization}, (err:any,result:ICollegecourses) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Course already exists."});
            }else{
                collegecourses.updateOne(collegecourses,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegecourses });
                    }
                });
            }
        });

    };

    public removeCollegecourses = (req: Request, res: Response) => {

        var collegecourses = new Collegecourses(req.body);


        Collegecourses.findByIdAndDelete(collegecourses.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": collegecourses });
            }
        });

    };

}

export const collegecoursesController = new CollegecoursesController ();
