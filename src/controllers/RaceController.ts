import { Request, Response } from "express";
import Race, {IRace} from '../models/race/race'
import Rcm from '../models/rcm/rcm'
// import MongoConnectionString from "../models/dbconnect";
import {MongoClient} from 'mongodb'
import CourseTable from "../models/course/course_table";
import {ICountry} from "../models/country/country";

export class RaceController {

    public findAll(req: Request, res: Response) {
        let races = Race.find((err: any, races: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": races });
            }
        });
    }

    /* public findAllRacesFromRCM(req: Request, res: Response) {

        MongoClient.connect(MongoConnectionString, function(err, client) {
            const db = client.db("ss");
            const col = db.collection("race_from_rcms_v");

            col.find({'cor_cd': req.params.code }).toArray( (err, docs) => {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": [] });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": docs });
                }
            });

            client.close();
        });
    } */

    public findByCode(req: Request, res: Response) {

        let race = Race.findById(req.params.code, (err: any, race: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": race });
            }
        });
    }


    public addRace = (req: Request, res: Response) => {
        var race = new Race(req.body);

        race.ai = 1;
        race.code =  'R1';

        Race.findOne( {}, {}, {}, (err:any,result:IRace) => {
            if (result) {
                race.ai = result.ai + 1;
                race.code = 'R' + race.ai;
            }

            race.save((err: any) => {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": race });
                }
            });
        }).sort({"ai":-1}).limit(1);

    };

    public updateRace = (req: Request, res: Response) => {

        var race = new Race(req.body);

        race.updateOne(race,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": race });
            }
        });

        // res.status(200).send({
        //     message: "Put Race successful!!"
        // });
    };

    public removeRace = (req: Request, res: Response) => {

        console.log('removeRace')
        var race = new Race(req.body);
        console.log('race id is ' + race.id)

        Race.findByIdAndDelete(race.id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": race });
            }
        });

        // race.replaceOne( race,(err: any) => {
        //     if (err) {
        //         res.send(err);
        //     } else {
        //         res.send(race);
        //     }
        // });
    };

    public createRace(req: Request, res: Response) {
        res.status(200).send({
            message: "Post Race successful!!"
        });
    }
}

export const raceController = new RaceController ();
