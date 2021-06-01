import { Request, Response } from "express";
import Rcm from '../models/rcm/rcm'
import RcmTable, {IRcmTable} from '../models/rcm/rcm.table'
import {IRace} from "../models/race/race";

export class RcmController {

    public findAll(req: Request, res: Response) {
        let rcms = Rcm.find((err: any, rcms: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": rcms });
            }
        });
    }

    public findByCode(req: Request, res: Response) {

        let race = Rcm.findById(req.params.code, (err: any, race: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": race });
            }
        });
    }


    public addRcm = (req: Request, res: Response) => {
        const rcm = new Rcm(req.body);


        let rcmTable = new RcmTable();

        rcmTable.ai = 1;
        rcmTable.code =  'RCM1';
        rcmTable.cou_cd = rcm.country.code;
        rcmTable.cor_cd = rcm.course.code;

        rcm.race_list.forEach( (race:IRace) => {
            rcmTable.race_list.push(race.code);
        });

        RcmTable.findOne({},{},{},(err:any,result:IRcmTable) => {

            if(result){
                rcmTable.ai =  result.ai + 1;
                rcmTable.code =  'RCM' + rcmTable.ai;
            }

            // console.log(rcmTable);

            rcmTable.save( (err: any) => {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": rcmTable });
                }
            });
        }).sort({"ai":-1}).limit(1);

    };

    public updateRcm = (req: Request, res: Response) => {
        const rcm = new Rcm(req.body);

        let rcmTable = new RcmTable();
        rcmTable._id = rcm._id;
        rcmTable.ai = rcm.ai;
        rcmTable.code = rcm.code;
        rcmTable.cou_cd = rcm.country.code;
        rcmTable.cor_cd = rcm.course.code;

        rcm.race_list.forEach( (race:IRace) => {
            rcmTable.race_list.push(race.code);
        });


        rcmTable.updateOne(rcmTable,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": rcmTable });
            }
        });
        // res.status(200).send({
        //     message: "Put Rcm successful!!"
        // });
    };

    public removeRcm = (req: Request, res: Response) => {

        let rcm = new Rcm(req.body);

        RcmTable.findByIdAndDelete(rcm.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": rcm });
            }
        });
    };

}

export const rcmController = new RcmController ();
