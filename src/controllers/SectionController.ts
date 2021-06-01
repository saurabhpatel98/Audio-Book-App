// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Sections, {ISections} from '../models/section/section'
import Primarycontact, {IPrimarycontact} from '../models/primarycontact/primarycontact'
import Course from "../models/course/course";
import Collegecourses, {ICollegecourses} from '../models/collegecourses/collegecourses'
import * as mongoose from "mongoose";

export class SectionsController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let cities = Sections.find((err: any, cities: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": cities });
            }
        });
    }

    public findById(req: Request, res: Response) {
        
        let sections = Sections.findById({_id: req.params.id}, (err: any, sections: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": sections });
            }
        });
    }

    public findByPageId(req: Request, res: Response) {
        
        let sections = Sections.findOne({_id: req.params.id,page: req.params.pageid}, (err: any, sections: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": sections });
            }
        });
    }

    public addSections = (req: Request, res: Response) => {
        let sections = new Sections(req.body);
        let primarycontact = new Primarycontact(req.body);

        sections.ai =1;
        sections.code = 'CC1';
        Sections.findOne( {name:req.body.name}, {page : req.body.page}, (err:any,result:ISections) => {
            if(!result){
                Sections.findOne( {}, {}, {}, (err:any,result:ISections) => {
                    if(result){
                        sections.ai =  result.ai + 1;
                        sections.code =  'CC' + sections.ai;
                        // sections.image =  req.body.file.filename;
                    }
                    sections.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": sections });
                        }
                    });
                    
                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({ "Error": "Section Already Exists"});
            }
        })
    };

    public updateSections = (req: Request, res: Response) => {
        let sections = new Sections(req.body);
        Sections.findOne( {name:req.body.name}, {page : req.body.page}, (err:any,result:ISections) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Section already exists."});
            }else{
                sections.updateOne(sections,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": sections });
                    }
                });
            }
        });
    };

    public removeSections = (req: Request, res: Response) => {

        var sections = new Sections(req.body);


        Sections.findByIdAndDelete(sections.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": sections });
            }
        });

    };

}

export const sectionsController = new SectionsController ();
