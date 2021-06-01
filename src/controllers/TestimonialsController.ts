// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Testimonials, {ITestimonials} from '../models/testimonials/testimonials'
import Primarycontact, {IPrimarycontact} from '../models/primarycontact/primarycontact'
import Course from "../models/course/course";
import Collegecourses, {ICollegecourses} from '../models/collegecourses/collegecourses'
import * as mongoose from "mongoose";

export class TestimonialsController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let cities = Testimonials.find((err: any, cities: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": cities });
            }
        });
    }

    public findByCode(req: Request, res: Response) {
        
        let testimonials = Testimonials.findById(req.params.id, (err: any, testimonials: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": testimonials });
            }
        });
    }

    public addTestimonials = (req: Request, res: Response) => {
        let testimonials = new Testimonials(req.body);

        testimonials.ai =1;
        testimonials.code = 'CC1';

            Testimonials.findOne( {}, {}, {}, (err:any,result:ITestimonials) => {
                if(result){
                    testimonials.ai =  result.ai + 1;
                    testimonials.code =  'CC' + testimonials.ai;
                }
                testimonials.save((err: any) => {

                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": testimonials });
                    }
                });
                
            }).sort({"ai":-1}).limit(1);

    };

    public updateTestimonials = (req: Request, res: Response) => {
        let testimonials = new Testimonials(req.body);

        testimonials.updateOne(testimonials,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": testimonials });
            }
        });

    };

    public removeTestimonials = (req: Request, res: Response) => {

        var testimonials = new Testimonials(req.body);


        Testimonials.findByIdAndDelete(testimonials.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": testimonials });
            }
        });

    };

}

export const testimonialsController = new TestimonialsController ();
