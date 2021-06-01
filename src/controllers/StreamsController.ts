// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Streams, {IStreams} from '../models/streams/streams'
import Course from "../models/course/course";

export class StreamsController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let streams = Streams.find((err: any, streams: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": streams });
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

    public findByCode(req: Request, res: Response) {

        let streams = Streams.findById(req.params.code, (err: any, streams: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": streams });
            }
        });
    }


    public addStreams = (req: Request, res: Response) => {
        let streams = new Streams(req.body);

        streams.ai =1;
        streams.code = 'CC1';
        Streams.findOne( {stream: req.body.stream}, (err:any,result:IStreams) => {
            if(!result){
                Streams.findOne( {}, {}, {}, (err:any,result:IStreams) => {
                    if(result){
                        streams.ai =  result.ai + 1;
                        streams.code =  'CC' + streams.ai;
                    }

                    streams.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": streams });
                        }
                    });

                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({"Error":"Stream already exists."});
            }
        });

    };

    public updateStreams = (req: Request, res: Response) => {
        let streams = new Streams(req.body);
        Streams.findOne( {stream: req.body.stream}, (err:any,result:IStreams) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"Stream already exists."});
            }else{
                streams.updateOne(streams,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": streams });
                    }
                });
            }
        });
    };

    public removeStreams = (req: Request, res: Response) => {

        var streams = new Streams(req.body);


        Streams.findByIdAndDelete(streams.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": streams });
            }
        });

    };

}

export const streamsController = new StreamsController ();
