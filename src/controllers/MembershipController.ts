import { Request, Response } from "express";
import Membership from '../models/subscription/memership'
import MembershipTable, {IMembershipTable, MembershipTableSchema} from '../models/subscription/memership.table'
import BetSelectionTable, {IBetSelectionTable} from "../models/betselection/betselection.table";

export class MembershipController {
    public findAll(req: Request, res: Response) {

        let mappings = Membership.find((err: any, mappings: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": mappings });
            }
        });

    }

    public findByCode(req: Request, res: Response) {

        let membership = Membership.findById(req.params.code, (err: any, membership: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": membership });
            }
        });
    }


    public addMembership = (req: Request, res: Response) => {
        let membership = new Membership(req.body);
        let ms_table = new MembershipTable();

        ms_table.id = membership.id;
        ms_table.ai = 1;
        ms_table.code = "M1";
        ms_table.first_name = membership.first_name;
        ms_table.last_name = membership.last_name;
        ms_table.email = membership.email;
        ms_table.mobile_no = membership.mobile_no;
        ms_table.start_date = membership.start_date;
        ms_table.end_date = membership.end_date;
        ms_table.subsmap_cd = membership.subsmap.code;

        MembershipTable.findOne( {}, {}, {}, (err:any,result:IMembershipTable) => {

            if(result){
                ms_table.ai =  result.ai + 1;
                ms_table.code =  'M' + ms_table.ai;
            }

            ms_table.save((err: any) => {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": membership });
                }
            });

        }).sort({"ai":-1}).limit(1);

    };

    public updateMembership = (req: Request, res: Response) => {

        let membership = new Membership(req.body);

        let mt = new MembershipTable();

        mt._id = membership._id;
        mt.code = membership.code;
        mt.first_name = membership.first_name;
        mt.last_name = membership.last_name;
        mt.email = membership.email;
        mt.mobile_no = membership.mobile_no;
        mt.start_date = membership.start_date;
        mt.end_date = membership.end_date;
        mt.subsmap_cd = membership.subsmap.code;


        mt.updateOne(membership,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": membership });
            }
        });

    };

    public removeMembership = (req: Request, res: Response) => {

        const membership = new Membership(req.body);


        MembershipTable.findByIdAndDelete(membership._id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": membership });
            }
        });

    };

}

export const membershipController = new MembershipController ();
