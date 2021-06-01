// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Country, {ICountry} from '../models/country/country'
import Course from "../models/course/course";

export class CountryController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let countries = Country.find((err: any, countries: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": countries });
            }
        });
    }


    public findAllFromCourse(req: Request, res: Response) {

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
    }

    public findByCode(req: Request, res: Response) {

        let country = Country.findById(req.params.code, (err: any, country: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": country });
            }
        });
    }


    public addCountry = (req: Request, res: Response) => {
        let country = new Country(req.body);

        country.ai =1;
        country.code = 'CC1';
        Country.findOne( {name: req.body.name}, (err:any,result:ICountry) => {
            if(!result){
                Country.findOne( {}, {}, {}, (err:any,result:ICountry) => {
                    if(result){
                        country.ai =  result.ai + 1;
                        country.code =  'CC' + country.ai;
                    }

                    country.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": country });
                        }
                    });

                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({"Error":"Country already exists."});
            }
        });

    };

    public updateCountry = (req: Request, res: Response) => {
        let country = new Country(req.body);

        Country.findOne( {name: req.body.name}, (err:any,result:ICountry) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Country already exists."});
            }else{
                country.updateOne(country,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": country });
                    }
                });
            }
        });

    };

    public removeCountry = (req: Request, res: Response) => {

        var country = new Country(req.body);


        Country.findByIdAndDelete(country.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": country });
            }
        });

    };

}

export const countryController = new CountryController ();
