// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Primarycontact, {IPrimarycontact} from '../models/primarycontact/primarycontact'
import Course from "../models/course/course";

export class PrimarycontactController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let cities = Primarycontact.find((err: any, cities: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": cities });
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
        
        let primarycontact = Primarycontact.findById(req.params.id, (err: any, primarycontact: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": primarycontact });
            }
        });
    }

    public findAllByState(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }
        let cities = Primarycontact.find({state : req.params.state},(err: any, cities: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": cities });
            }
        });
    }

    public findAllByCountry(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }
        let cities = Primarycontact.find({"country":req.params.country},(err: any, cities: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": cities });
            }
        });
    }

    public addPrimarycontact = (req: Request, res: Response) => {
        let primarycontact = new Primarycontact(req.body);

        primarycontact.ai =1;
        primarycontact.code = 'CC1';

        Primarycontact.findOne( {title: req.body.title}, (err:any,result:IPrimarycontact) => {
            if(!result){
                Primarycontact.findOne( {}, {}, {}, (err:any,result:IPrimarycontact) => {
                    if(result){
                        primarycontact.ai =  result.ai + 1;
                        primarycontact.code =  'CC' + primarycontact.ai;
                    }
                    primarycontact.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": primarycontact });
                        }
                    });
                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({"Error":"Primarycontact already exists."});
            }
        });

    };

    public updatePrimarycontact = (req: Request, res: Response) => {
        let primarycontact = new Primarycontact(req.body);

        Primarycontact.findOne( {name: req.body.name}, {state : req.body.state}, {country : req.body.country}, (err:any,result:IPrimarycontact) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Primarycontact already exists."});
            }else{
                primarycontact.updateOne(primarycontact,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": primarycontact });
                    }
                });
            }
        });

    };

    public removePrimarycontact = (req: Request, res: Response) => {

        var primarycontact = new Primarycontact(req.body);


        Primarycontact.findByIdAndDelete(primarycontact.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": primarycontact });
            }
        });

    };

}

export const primarycontactController = new PrimarycontactController ();
