import { Request, Response } from "express";
import BetType, {IBetType} from '../models/bettype/bettype'

export class BetTypeController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let bettypes = BetType.find((err: any, bettypes: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": bettypes });
            }
        });
    }

    public findByCode(req: Request, res: Response) {

        let bettype = BetType.findById(req.params.code, (err: any, bettype: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": bettype });
            }
        });
    }


    public addBetType = (req: Request, res: Response) => {
        let bettype = new BetType(req.body);


        delete bettype._id;
        bettype.ai =  1;
        bettype.code =  'BT1';


        BetType.findOne({}, {}, {}, (err:any, result:IBetType) =>{
            if(result){
                bettype.ai =  result.ai + 1;
                bettype.code =  'BT' + bettype.ai;
            }

            console.log(bettype);

            bettype.save((err: any) => {

                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": bettype });
                }
            });

        }).sort({"ai":-1}).limit(1);


    };

    public updateBetType = (req: Request, res: Response) => {

        const bettype = new BetType(req.body);

        bettype.updateOne(bettype,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": bettype });
            }
        });

    };

    public removeBetType = (req: Request, res: Response) => {

        const bettype = new BetType(req.body);

        BetType.findByIdAndDelete(bettype.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": bettype });
            }
        });

    };

}

export const bettypeController = new BetTypeController ();
