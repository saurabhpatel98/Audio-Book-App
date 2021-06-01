import { Request, Response } from "express";
import RunSelection from '../models/runselection/runselection'
import RunSelectionTable from  '../models/runselection/runselection.table'
import BetSelectionTable, {IBetSelectionTable} from "../models/betselection/betselection.table";

export class RunningSelectionController {

    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let runselections = RunSelection.find((err: any, runselections: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": runselections });
            }
        });
    }

    public findByCode(req: Request, res: Response) {

        let runselection = RunSelection.findById(req.params.code, (err: any, runselection: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": runselection });
            }
        });
    }


    public addRunSelection = (req: Request, res: Response) => {
        const bs = new RunSelection(req.body);

        var bs_table = new RunSelectionTable();
        bs_table.ai = 1;
        bs_table.code = 1;
        bs_table.status = 'A';
        bs_table.cou_cd = bs.country.code;
        bs_table.cor_cd = bs.course.code;
        bs_table.rac_cd = bs.race.code;
        bs_table.bet_cd = bs.bettype.code;
        bs_table.time   = bs.time;
        bs_table.is_free = bs.is_free;
        bs_table.subs_mappings = bs.subs_mappings;
        bs_table.selections = bs.selections;


        RunSelectionTable.findOne( {}, {}, {}, (err:any,result:IBetSelectionTable) => {
            if(result){
                bs_table.code = result.code + 1;
            }else{
                bs_table.ai = 1;
                bs_table.code = 1;
            }

            bs_table.save((err: any) => {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": bs_table });
                }
            });

        }).sort({"code":-1}).limit(1);


    };

    public addRunSelectionFromArray = (req: Request, res: Response) => {
        const bs = req.body;

        let bs_lst = [];

        bs.forEach(function (b) {
            var bs_table = new RunSelectionTable();

            bs_table.ai = 1;
            bs_table.code = 1;
            bs_table.status = 'A';
            bs_table.cou_cd = b.country.code;
            bs_table.cor_cd = b.course.code;
            bs_table.rac_cd = b.race.code;
            bs_table.bet_cd = b.bettype.code;
            bs_table.time   = b.time;
            bs_table.is_free = b.is_free;
            bs_table.subs_mappings = b.subs_mappings;
            bs_table.selections = b.selections;

            bs_lst.push(bs_table);
        });

        let current_val = 0;

        RunSelectionTable.findOne( {}, {}, {}, (err:any,result:IBetSelectionTable) => {
            if(result){
                current_val = result.code;
            }

            bs_lst.forEach( ( b) => {
                current_val++;
                b.ai = current_val;
                b.code = current_val;
            });

            RunSelectionTable.insertMany(bs_lst, (err: any) =>  {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": bs_lst });
                }
            });
        }).sort({"code":-1}).limit(1);

    };

    public updateRunSelection = (req: Request, res: Response) => {

        var bs = new RunSelection(req.body);
        var bs_table = new RunSelectionTable();

        bs_table.id = bs.id;
        bs_table._id = bs._id;
        bs_table.code = bs.code;
        bs_table.status = bs.status;
        bs_table.cou_cd = bs.country.code;
        bs_table.cor_cd = bs.course.code;
        bs_table.rac_cd = bs.race.code;
        bs_table.bet_cd = bs.bettype.code;
        bs_table.time   = bs.time;
        bs_table.is_free = bs.is_free;
        bs_table.subs_mappings = bs.subs_mappings;
        bs_table.selections = bs.selections;


        RunSelectionTable.updateOne(bs_table,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": bs });
            }
        });

    };

    public removeRunSelection = (req: Request, res: Response) => {

        var runselection = new RunSelection(req.body);

        RunSelectionTable.findByIdAndDelete(runselection._id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": runselection });
            }
        });

    };

}

export const runningSelectionController = new RunningSelectionController ();
