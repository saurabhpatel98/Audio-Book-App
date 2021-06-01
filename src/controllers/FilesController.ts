// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Files, {IFiles} from '../models/files/files'
import Course from "../models/course/course";

export class FilesController {
    /* public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let files = Files.find((err: any, files: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": files });
            }
        });
    } */


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

    /* public findByCode(req: Request, res: Response) {

        let books = Books.findById(req.params.code, (err: any, books: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": books });
            }
        });
    } */


    /* public addBooks = (req: Request, res: Response) => {
        let books = new Books(req.body);

        books.ai =1;
        books.code = 'CC1';

        Books.findOne( {}, {}, {}, (err:any,result:IBooks) => {
            if(result){
                books.ai =  result.ai + 1;
                books.code =  'CC' + books.ai;
            }

            books.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": books });
                }
            });

        }).sort({"ai":-1}).limit(1);


    }; */
    public addFiles = (req: Request, res: Response) => {
        let files = new Files(req.body);

        /* files.ai =1;
        files.code = 'CC1'; */

        Files.findOne( {}, {}, {}, (err:any,result:IFiles) => {
            /* if(result){
                files.ai =  result.ai + 1;
                files.code =  'CC' + files.ai;
            } */

            files.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": files });
                }
            });

        }).sort({"ai":-1}).limit(1);


    };

    /* public updateBooks = (req: Request, res: Response) => {
        let books = new Books(req.body);

        books.updateOne(books,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": books });
            }
        });

    };

    public removeBooks = (req: Request, res: Response) => {

        var books = new Books(req.body);


        Books.findByIdAndDelete(books.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": books });
            }
        });

    }; */

}

export const filesController = new FilesController ();
