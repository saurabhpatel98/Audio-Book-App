// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Blogs, {IBlogs} from '../models/blogs/blogs'
import Primarycontact, {IPrimarycontact} from '../models/primarycontact/primarycontact'
import Course from "../models/course/course";
import Collegecourses, {ICollegecourses} from '../models/collegecourses/collegecourses'
import * as mongoose from "mongoose";

export class BlogsController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let cities = Blogs.find((err: any, cities: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": cities });
            }
        });
    }

    public findById(req: Request, res: Response) {
        
        let blogs = Blogs.findById({_id: req.params.id}, (err: any, blogs: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": blogs });
            }
        });
    }

    public addBlogs = (req: Request, res: Response) => {
        let blogs = new Blogs(req.body);
        let primarycontact = new Primarycontact(req.body);

        blogs.ai =1;
        blogs.code = 'CC1';

            Blogs.findOne( {}, {}, {}, (err:any,result:IBlogs) => {
                if(result){
                    blogs.ai =  result.ai + 1;
                    blogs.code =  'CC' + blogs.ai;
                    // blogs.image =  req.body.file.filename;
                }
                blogs.save((err: any) => {

                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": blogs });
                    }
                });
                
            }).sort({"ai":-1}).limit(1);

    };

    public updateBlogs = (req: Request, res: Response) => {
        let blogs = new Blogs(req.body);

        blogs.updateOne(blogs,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": blogs });
            }
        });

    };

    public removeBlogs = (req: Request, res: Response) => {

        var blogs = new Blogs(req.body);


        Blogs.findByIdAndDelete(blogs.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": blogs });
            }
        });

    };

}

export const blogsController = new BlogsController ();
