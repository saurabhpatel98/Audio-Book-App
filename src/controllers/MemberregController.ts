// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/
// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
import { Request, Response } from "express";
import Memberreg, {IMemberreg} from '../models/memberreg/memberreg'
import Course from "../models/course/course";

export class MemberregController {
    public findAll(req: Request, res: Response) {

        let clientResult = { "accepted": true,  "status":200, "error_code":'', "message":'', "data":'' }

        let memberreg = Memberreg.find((err: any, memberreg: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": memberreg });
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

        let memberreg = Memberreg.findById(req.params.code, (err: any, memberreg: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": memberreg });
            }
        });
    }


    public addMemberreg = (req: Request, res: Response) => {
        let memberreg = new Memberreg(req.body);

        memberreg.ai =1;
        memberreg.code = 'MM1';

        Memberreg.findOne( {email: req.body.email}, (err:any,result:IMemberreg) => {
            if(!result){
                Memberreg.findOne( {}, {}, {}, (err:any,result:IMemberreg) => {
                    if(result){
                        memberreg.ai =  result.ai + 1;
                        memberreg.code =  'MM' + memberreg.ai;
                    }

                    memberreg.save((err: any) => {

                        if (err) {
                            res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                        } else {
                            res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": memberreg });
                        }
                    });

                }).sort({"ai":-1}).limit(1);
            }else{
                res.send({"Error":"Email is already registered."});
            }
        });


    };

    public login = (req: Request, res: Response) => {
        let memberreg = new Memberreg(req.body);

        Memberreg.findOne( {email: req.body.username}, (err:any,result:IMemberreg) => {
            if(result){
                if(result.password==req.body.password){
                    res.send({"Success":"Success!"});
                }else{
                    res.send({"Error":"Wrong username or password!"});
                }
            }else{
                res.send({"Error":"This Email Is not regestered!"});
            }
        });

    };
    public updateMemberreg = (req: Request, res: Response) => {
        let memberreg = new Memberreg(req.body);

        memberreg.updateOne(memberreg,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": memberreg });
            }
        });

    };

    public removeMemberreg = (req: Request, res: Response) => {

        var memberreg = new Memberreg(req.body);


        Memberreg.findByIdAndDelete(memberreg.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": memberreg });
            }
        });

    };

}

export const memberregController = new MemberregController ();
