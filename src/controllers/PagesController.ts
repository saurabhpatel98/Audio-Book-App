// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Pages, {IPages} from '../models/pages/pages'
import Primarycontact, {IPrimarycontact} from '../models/primarycontact/primarycontact'
import Course from "../models/course/course";
import Collegecourses, {ICollegecourses} from '../models/collegecourses/collegecourses'
import * as mongoose from "mongoose";

export class PagesController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let cities = Pages.find((err: any, cities: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": cities });
            }
        });
    }

    public findById(req: Request, res: Response) {
        
        let pages = Pages.findById({_id: req.params.id}, (err: any, pages: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": pages });
            }
        });
    }

    public addPages = (req: Request, res: Response) => {
        let pages = new Pages(req.body);
        let primarycontact = new Primarycontact(req.body);

        pages.ai =1;
        pages.code = 'CC1';

        Pages.findOne( {name:req.body.name}, (err:any,result:IPages) => {
            if(!result){
                Pages.findOne( {}, {}, {}, (err:any,result:IPages) => {
                    if(result){
                        pages.ai =  result.ai + 1;
                        pages.code =  'CC' + pages.ai;
                        // pages.image =  req.body.file.filename;
                    }
                    pages.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": pages });
                        }
                    });
                    
                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({ "Error": "Page Already Exists"});
            }
        })

    };

    public updatePages = (req: Request, res: Response) => {
        let pages = new Pages(req.body);

        Pages.findOne( {name:req.body.name}, (err:any,result:IPages) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Page already exists."});
            }else{
                pages.updateOne(pages,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": pages });
                    }
                });
            }
        });

    };

    public removePages = (req: Request, res: Response) => {

        var pages = new Pages(req.body);


        Pages.findByIdAndDelete(pages.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": pages });
            }
        });

    };

}

export const pagesController = new PagesController ();
