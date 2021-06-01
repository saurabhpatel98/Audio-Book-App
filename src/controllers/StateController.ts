// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import State, {IState} from '../models/state/state'
import Course from "../models/course/course";

export class StateController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let states = State.find((err: any, states: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": states });
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

        let state = State.findById(req.params.code, (err: any, state: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": state });
            }
        });
    }

    public findAllByCountry(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }
        let state = State.find({country : req.params.country},(err: any, state: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": state });
            }
        });
    }


    public addState = (req: Request, res: Response) => {
        let state = new State(req.body);

        state.ai =1;
        state.code = 'SS1';
        State.findOne( {name: req.body.name}, {country : req.body.country}, (err:any,result:IState) => {
            if(!result){
                State.findOne( {}, {}, {}, (err:any,result:IState) => {
                    if(result){
                        state.ai =  result.ai + 1;
                        state.code =  'SS' + state.ai;
                    }

                    state.save((err: any) => {
                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": state });
                        }
                    });

                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({"Error":"State already exists."});
            }
        });
    };

    public updateState = (req: Request, res: Response) => {
        let state = new State(req.body);
        
        State.findOne( {name: req.body.name}, {country : req.body.country}, (err:any,result:IState) => {
            if(result && result._id != req.body._id){
                res.send({"Error":"State already exists."});
            }else{
                state.updateOne(state,(err: any) => {
                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": state });
                    }
                });
            }
        });

    };

    public removeState = (req: Request, res: Response) => {

        var state = new State(req.body);
        
        State.findByIdAndDelete(state.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": state });
            }
        });
        
    };

}

export const stateController = new StateController ();
