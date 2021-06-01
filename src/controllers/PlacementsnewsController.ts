// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Placementsnews, {IPlacementsnews} from '../models/placementsnews/placementsnews'
import Primarycontact, {IPrimarycontact} from '../models/primarycontact/primarycontact'
import Course from "../models/course/course";
import Collegecourses, {ICollegecourses} from '../models/collegecourses/collegecourses'
import * as mongoose from "mongoose";

export class PlacementsnewsController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let placementsnews = Placementsnews.find((err: any, placementsnews: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placementsnews });
            }
        });
    }

    public findById(req: Request, res: Response) {
        
        let placementsnews = Placementsnews.findById(req.params.id, (err: any, placementsnews: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placementsnews });
            }
        });
    }
    public findByPriority(req: Request, res: Response) {
        
        let placementsnews = Placementsnews.findOne({priority : req.params.priority}, (err: any, placementsnews: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placementsnews });
            }
        });
    }

    public addPlacementsnews = (req: Request, res: Response) => {
        let placementsnews = new Placementsnews(req.body);

        placementsnews.ai =1;
        placementsnews.code = 'CC1';

    
        if(req.body.priority != ''){
            Placementsnews.findOne( {priority : req.body.priority}, (err:any,result:IPlacementsnews) => {
                if(result){
                    res.send({ "Error": 'Priority Already Exists'});
                }else{
                    Placementsnews.findOne( {}, {}, {}, (err:any,result:IPlacementsnews) => {
                        if(result){
                            placementsnews.ai =  result.ai + 1;
                            placementsnews.code =  'CC' + placementsnews.ai;
                        }
                        placementsnews.save((err: any) => {
        
                            if (err) {
                                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                            } else {
                                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placementsnews });
                            }
                        });
                        
                    }).sort({"ai":-1}).limit(1);
                }
            })
        }else{
            Placementsnews.findOne( {}, {}, {}, (err:any,result:IPlacementsnews) => {
                if(result){
                    placementsnews.ai =  result.ai + 1;
                    placementsnews.code =  'CC' + placementsnews.ai;
                }
                placementsnews.save((err: any) => {

                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placementsnews });
                    }
                });
                
            }).sort({"ai":-1}).limit(1);
        }
        
    };

    public updatePlacementsnews = (req: Request, res: Response) => {
        let placementsnews = new Placementsnews(req.body);

        if(req.body.priority != ''){
            Placementsnews.findOne( {priority : req.body.priority}, (err:any,result:IPlacementsnews) => {
                if(result && req.body._id != result._id){
                    res.send({ "Error": 'Priority Already Exists'});
                }else{
                    placementsnews.updateOne(placementsnews,(err: any) => {
                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placementsnews });
                        }
                    });
                }
            });
        }else{
            placementsnews.updateOne(placementsnews,(err: any) => {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placementsnews });
                }
            });
        }
    };

    public removePlacementsnews = (req: Request, res: Response) => {

        var placementsnews = new Placementsnews(req.body);


        Placementsnews.findByIdAndDelete(placementsnews.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": placementsnews });
            }
        });

    };

}

export const placementsnewsController = new PlacementsnewsController ();
