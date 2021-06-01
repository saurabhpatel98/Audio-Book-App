// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import City, {ICity} from '../models/city/city'
import Course from "../models/course/course";

export class CityController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let cities = City.find((err: any, cities: any) => {
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
        
        let city = City.findById(req.params.id, (err: any, city: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": city });
            }
        });
    }

    public findAllByState(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }
        let cities = City.find({state : req.params.state},(err: any, cities: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": cities });
            }
        });
    }

    public findAllByCountry(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }
        let cities = City.find({"country":req.params.country},(err: any, cities: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": cities });
            }
        });
    }

    public addCity = (req: Request, res: Response) => {
        let city = new City(req.body);

        city.ai =1;
        city.code = 'CC1';

        City.findOne( {name: req.body.name}, {state : req.body.state}, {country : req.body.country}, (err:any,result:ICity) => {
            if(!result){
                City.findOne( {}, {}, {}, (err:any,result:ICity) => {
                    if(result){
                        city.ai =  result.ai + 1;
                        city.code =  'CC' + city.ai;
                    }

                    city.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": city });
                        }
                    });
                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({"Error":"City already exists."});
            }
        });

    };

    public updateCity = (req: Request, res: Response) => {
        let city = new City(req.body);

        City.findOne( {name: req.body.name}, {state : req.body.state}, {country : req.body.country}, (err:any,result:ICity) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"City already exists."});
            }else{
                city.updateOne(city,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": city });
                    }
                });
            }
        });

    };

    public removeCity = (req: Request, res: Response) => {

        var city = new City(req.body);


        City.findByIdAndDelete(city.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": city });
            }
        });

    };

}

export const cityController = new CityController ();
