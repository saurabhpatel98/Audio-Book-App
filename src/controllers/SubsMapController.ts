import { Request, Response } from "express";
import SubscriptionMapping from '../models/subscription/subsmap'
import SubscriptionMappingTable, {ISubscriptionMappingTable} from '../models/subscription/subsmap.table'

export class SubscriptionMappingController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let mappings = SubscriptionMapping.find((err: any, mappings: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": mappings });
            }
        });
    }

    public findByCode(req: Request, res: Response) {

        let submap = SubscriptionMapping.findById(req.params.code, (err: any, submap: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": submap });
            }
        });
    }


    public addSubscriptionMapping = (req: Request, res: Response) => {
        const submap = new SubscriptionMapping(req.body);
        let submapTable = new SubscriptionMappingTable();

        submapTable.id = submap.id;
        submapTable.ai = 1;
        submapTable.code =  'SMC1';
        submapTable.name = submap.name;
        submapTable.cou_cd = submap.country.code;
        submapTable.plan_cd = submap.plan.code;
        submapTable.type_cd = submap.type.code;
        submapTable.period_cd = submap.period.code;
        submapTable.desc = submap.desc;
        submapTable.price = submap.price;
        submapTable.status = submap.status;
        submapTable.image = submap.image;

        SubscriptionMappingTable.findOne( {}, {}, {}, (err:any,result:ISubscriptionMappingTable) => {

            if(result){
                submapTable.ai =  result.ai + 1;
                submapTable.code =  'SMC' + submapTable.ai;
            }

            submapTable.save((err: any) => {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": submapTable });
                }
            });

        }).sort({"ai":-1}).limit(1);


    };

    public updateSubscriptionMapping = (req: Request, res: Response) => {
        const submap = new SubscriptionMapping(req.body);

        let submapTable = new SubscriptionMappingTable();

        submapTable._id = submap._id;
        submapTable.ai = submap.ai;
        submapTable.code = submap.code;
        submapTable.name = submap.name;
        submapTable.cou_cd = submap.country.code;
        submapTable.plan_cd = submap.plan.code;
        submapTable.type_cd = submap.type.code;
        submapTable.period_cd = submap.period.code;
        submapTable.desc = submap.desc;
        submapTable.price = submap.price;
        submapTable.status = submap.status;
        submapTable.image = submap.image;

        console.log(submapTable);

        submapTable.updateOne(submapTable,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": submapTable });
            }
        });

    };

    public removeSubscriptionMapping = (req: Request, res: Response) => {

        var submap = new SubscriptionMapping(req.body);


        SubscriptionMappingTable.findByIdAndDelete(submap._id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": submap });
            }
        });

    };

}

export const subsMapController = new SubscriptionMappingController ();
