// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Specialization, {ISpecialization} from '../models/specialization/specialization'
import Course from "../models/course/course";

export class SpecializationController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let specialization = Specialization.find((err: any, specialization: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": specialization });
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

    public findByCode(req: Request, res: Response) {

        let specialization = Specialization.findById(req.params.code, (err: any, specialization: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": specialization });
            }
        });
    }

    public findByCourse(req: Request, res: Response) {

        let specialization = Specialization.find({course: req.params.course}, (err: any, specialization: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": specialization });
            }
        });
    }


    public addSpecialization = (req: Request, res: Response) => {
        let specialization = new Specialization(req.body);

        specialization.ai =1;
        specialization.code = 'SP1';

        Specialization.findOne( {stream: req.body.stream, course: req.body.course, specialization: req.body.specialization}, (err:any,result:ISpecialization) => {
            if(!result){
                Specialization.findOne( {}, {}, {}, (err:any,result:ISpecialization) => {
                    if(result){
                        specialization.ai =  result.ai + 1;
                        specialization.code =  'SP' + specialization.ai;
                    }

                    specialization.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": specialization });
                        }
                    });

                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({"Error":"Specialization already exists."});
            }
        });

    };

    public updateSpecialization = (req: Request, res: Response) => {
        let specialization = new Specialization(req.body);
        Specialization.findOne( {stream: req.body.stream, course: req.body.course, specialization: req.body.specialization}, (err:any,result:ISpecialization) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Course already exists."});
            }else{
                specialization.updateOne(specialization,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": specialization });
                    }
                });
            }
        });

    };

    public removeSpecialization = (req: Request, res: Response) => {

        var specialization = new Specialization(req.body);

        Specialization.findOne( {stream: req.body.stream}, {name: req.body.name}, (err:any,result:ISpecialization) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Specialization already exists."});
            }else{
                Specialization.findByIdAndDelete(specialization.id, (err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": specialization });
                    }
                });
            }
        });
    };

}

export const specializationController = new SpecializationController ();
