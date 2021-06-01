// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Browsebyabout, {IBrowsebyabout} from '../models/browsebyabout/browsebyabout'
import Primarycontact, {IPrimarycontact} from '../models/primarycontact/primarycontact'
import Course from "../models/course/course";
import Collegecourses, {ICollegecourses} from '../models/collegecourses/collegecourses'
import * as mongoose from "mongoose";

export class BrowsebyaboutController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let browsebyabout = Browsebyabout.find((err: any, browsebyabout: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": browsebyabout });
            }
        });
    }

    public findByCode(req: Request, res: Response) {
        
        let browsebyabout = Browsebyabout.findById(req.params.id, (err: any, browsebyabout: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": browsebyabout });
            }
        });
    }

    public addBrowsebyabout = (req: Request, res: Response) => {
        let browsebyabout = new Browsebyabout(req.body);

        browsebyabout.ai =1;
        browsebyabout.code = 'CC1';

        
        let brousebyabout = Browsebyabout.find((err: any, brousebyabout: any) => {
            if(brousebyabout.length == '5'){
                res.send({ "Error": 'Sorry, You Cannot Add.'});
            }
        })
        Browsebyabout.findOne( {name : req.body.name}, (err:any,result:IBrowsebyabout) => {
            if(!result){
                Browsebyabout.findOne( {}, {}, {}, (err:any,result:IBrowsebyabout) => {
                    if(result){
                        browsebyabout.ai =  result.ai + 1;
                        browsebyabout.code =  'CC' + browsebyabout.ai;
                    }
                    browsebyabout.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": browsebyabout });
                        }
                    });
                    
                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({ "Error": 'Course Already Exists'});
            }
        })
    };

    public updateBrowsebyabout = (req: Request, res: Response) => {
        let browsebyabout = new Browsebyabout(req.body);

        Browsebyabout.findOne( {name : req.body.name}, (err:any,result:IBrowsebyabout) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Course Already Exists."});
            }else{
                browsebyabout.updateOne(browsebyabout,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": browsebyabout });
                    }
                });
            }
        });

    };

    public removeBrowsebyabout = (req: Request, res: Response) => {

        var browsebyabout = new Browsebyabout(req.body);


        Browsebyabout.findByIdAndDelete(browsebyabout.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": browsebyabout });
            }
        });

    };

}

export const browsebyaboutController = new BrowsebyaboutController ();
