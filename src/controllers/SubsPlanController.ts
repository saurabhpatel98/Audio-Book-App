import { Request, Response } from "express";
import SubscriptionPlan from '../models/subscription/subsplan'
import SubscriptionType, {ISubscriptionType} from "../models/subscription/substype";

export class SubscriptionPlanController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let plans = SubscriptionPlan.find((err: any, plans: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": plans });
            }
        });
    }

    public findByCode(req: Request, res: Response) {

        let subsplan = SubscriptionPlan.findById(req.params.code, (err: any, subsplan: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": subsplan });
            }
        });
    }


    public addSubscriptionPlan = (req: Request, res: Response) => {
        var subsplan = new SubscriptionPlan(req.body);

        subsplan.ai =  1;
        subsplan.code =  'PAC1';
        SubscriptionType.findOne({},{},{}, (err:any,result:ISubscriptionType)=>{

            if(result){
                subsplan.ai =  result.ai + 1;
                subsplan.code =  'PAC' + subsplan.ai;
            }

            subsplan.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": subsplan });
                }
            });

        }).sort({"ai":-1}).limit(1);

    };

    public updateSubscriptionPlan = (req: Request, res: Response) => {

        var subsplan = new SubscriptionPlan(req.body);

        subsplan.updateOne(subsplan,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": subsplan });
            }
        });

    };

    public removeSubscriptionPlan = (req: Request, res: Response) => {

        var subsplan = new SubscriptionPlan(req.body);

        SubscriptionPlan.findByIdAndDelete(subsplan.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": subsplan });
            }
        });

    };

}

export const subsplanController = new SubscriptionPlanController ();
