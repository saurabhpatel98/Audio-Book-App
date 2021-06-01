// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Uploads, {IUploads} from '../models/uploads/uploads'
import Course from "../models/course/course";

export class UploadsController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let uploads = Uploads.find((err: any, uploads: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": uploads });
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

    public findById(req: Request, res: Response) {

        let uploads = Uploads.findById(req.params.id, (err: any, uploads: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": uploads });
            }
        });
    }
    public findByDepartment(req: Request, res: Response) {

        let uploads = Uploads.find({department : req.params.department}, (err: any, uploads: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": uploads });
            }
        });
    }
    public findByUploads(req: Request, res: Response) {

        let uploads = Uploads.find({name : req.params.name}, (err: any, uploads: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": uploads });
            }
        });
    }

    public addUploads = (req: Request, res: Response) => {
        let uploads = new Uploads(req.body);

        /* var multer  = require('multer');
        var storage = multer.diskStorage({
            destination: (req, file, cb) => {
            cb(null, './src/images');
            },
            filename: (req, file, cb) => {
            console.log(file);
            var filetype = '';
            if(file.mimetype === 'image/gif') {
                filetype = 'gif';
            }
            if(file.mimetype === 'image/png') {
                filetype = 'png';
            }
            if(file.mimetype === 'image/jpeg') {
                filetype = 'jpg';
            }
            cb(null, 'image-' + Date.now() + '.' + filetype);
            },
        });
        var upload = multer({ storage: storage });

        upload.single("image") */

        uploads.ai =1;
        uploads.code = 'CO1';
        // uploads.image = req.file.filename;

        Uploads.findOne( {}, {}, {}, (err:any,result:IUploads) => {
            if(result){
                uploads.ai =  result.ai + 1;
                uploads.code =  'CO' + uploads.ai;
            }

            uploads.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": uploads });
                }
            });

        }).sort({"ai":-1}).limit(1);

    };

    public updateUploads = (req: Request, res: Response) => {
        let uploads = new Uploads(req.body);
        
            uploads.updateOne(uploads,(err: any) => {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": uploads });
                }
        });
    };

    public removeUploads = (req: Request, res: Response) => {

        var uploads = new Uploads(req.body);


        Uploads.findByIdAndDelete(uploads.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": uploads });
            }
        });

    };

}

export const uploadsController = new UploadsController ();
