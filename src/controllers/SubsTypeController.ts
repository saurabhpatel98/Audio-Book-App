import { Request, Response } from "express";
import SubscriptionType, {ISubscriptionType} from '../models/subscription/substype'

export class SubscriptionTypeController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let types = SubscriptionType.find((err: any, types: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": types });
            }
        });
    }

    public findByCode(req: Request, res: Response) {

        let substype = SubscriptionType.findById(req.params.code, (err: any, substype: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": substype });
            }
        });
    }


    public addSubscriptionType = (req: Request, res: Response) => {
        var substype = new SubscriptionType(req.body);

        substype.ai =  1;
        substype.code =  'STC1';
        SubscriptionType.findOne({},{},{}, (err:any,result:ISubscriptionType)=>{

            if(result){
                substype.ai =  result.ai + 1;
                substype.code =  'STC' + substype.ai;
            }

            substype.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": substype });
                }
            });

        }).sort({"ai":-1}).limit(1);


    };

    public updateSubscriptionType = (req: Request, res: Response) => {

        var substype = new SubscriptionType(req.body);

        substype.updateOne(substype,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": substype });
            }
        });

    };

    public removeSubscriptionType = (req: Request, res: Response) => {

        var substype = new SubscriptionType(req.body);

        SubscriptionType.findByIdAndDelete(substype.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": substype });
            }
        });

    };

}

export const subsTypeController = new SubscriptionTypeController ();
