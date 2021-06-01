import { Request, Response } from "express";
import SubscriptionPeriod from '../models/subscription/subsperiod'

export class SubscriptionPeriodController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let subsperiods = SubscriptionPeriod.find((err: any, subsperiods: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": subsperiods });
            }
        });
    }

    public findByCode(req: Request, res: Response) {

        let subsperiod = SubscriptionPeriod.findById(req.params.code, (err: any, subsperiod: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": subsperiod });
            }
        });
    }


    public addSubscriptionPeriod = (req: Request, res: Response) => {
        var subsperiod = new SubscriptionPeriod(req.body);

        let subsperiods = SubscriptionPeriod.find((err: any, subsperiods: any) => {
            if (!err) {

                if(subsperiods.length > 0){
                    let c = subsperiods[subsperiods.length - 1];
                    subsperiod.code =  'STP' + (parseInt(c.code.replace('STP','')) + 1);
                }else {
                    subsperiod.code =  'STP1';
                }

                subsperiod.save((err: any) => {

                    if (err) {
                        res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                    } else {
                        res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": subsperiod });
                    }
                });
            }
        });


    };

    public updateSubscriptionPeriod = (req: Request, res: Response) => {

        var subsperiod = new SubscriptionPeriod(req.body);

        subsperiod.updateOne(subsperiod,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": subsperiod });
            }
        });

    };

    public removeSubscriptionPeriod = (req: Request, res: Response) => {

        var subsperiod = new SubscriptionPeriod(req.body);

        SubscriptionPeriod.findByIdAndDelete(subsperiod._id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": subsperiod });
            }
        });

    };

}

export const subsPeriodController = new SubscriptionPeriodController ();
