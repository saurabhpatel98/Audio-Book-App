// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import News, {INews} from '../models/news/news'
import Primarycontact, {IPrimarycontact} from '../models/primarycontact/primarycontact'
import Course from "../models/course/course";
import Collegecourses, {ICollegecourses} from '../models/collegecourses/collegecourses'
import * as mongoose from "mongoose";

export class NewsController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let cities = News.find((err: any, cities: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": cities });
            }
        });
    }

    public findById(req: Request, res: Response) {
        
        let news = News.findById(req.params.id, (err: any, news: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": news });
            }
        });
    }

    public findByPriority(req: Request, res: Response) {
        
        let news = News.findOne({priority : req.params.priority}, (err: any, news: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": news });
            }
        });
    }

    public addNews = (req: Request, res: Response) => {
        let news = new News(req.body);

        news.ai =1;
        news.code = 'CC1';

            if(req.body.priority != ''){
                News.findOne( {priority : req.body.priority}, (err:any,result:INews) => {
                    if(result){
                        res.send({ "Error": 'Priority Already Exists'});
                    }else{
                        News.findOne( {}, {}, {}, (err:any,result:INews) => {
                            if(result){
                                news.ai =  result.ai + 1;
                                news.code =  'CC' + news.ai;
                            }
                            news.save((err: any) => {
            
                                if (err) {
                                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                                } else {
                                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": news });
                                }
                            });
                            
                        }).sort({"ai":-1}).limit(1);
                    }
                })
            }else{
                News.findOne( {}, {}, {}, (err:any,result:INews) => {
                    if(result){
                        news.ai =  result.ai + 1;
                        news.code =  'CC' + news.ai;
                    }
                    news.save((err: any) => {
    
                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": news });
                        }
                    });
                    
                }).sort({"ai":-1}).limit(1);
            }
            

    };

    public updateNews = (req: Request, res: Response) => {
        let news = new News(req.body);

        if(req.body.priority != ''){
            News.findOne( {priority : req.body.priority}, (err:any,result:INews) => {
                if(result && req.body._id != result._id){
                    res.send({ "Error": 'Priority Already Exists'});
                }else{
                    news.updateOne(news,(err: any) => {
                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": news });
                        }
                    });
                }
            });
        }else{
            News.updateOne(news,(err: any) => {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": news });
                }
            });
        }

    };

    public removeNews = (req: Request, res: Response) => {

        var news = new News(req.body);


        News.findByIdAndDelete(news.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": news });
            }
        });

    };

}

export const newsController = new NewsController ();
