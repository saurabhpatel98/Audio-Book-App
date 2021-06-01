import {Request, Response} from "express";
import User, {IUser} from "../models/user/user";
import UserSession, {IUserSession, UserSessionSchema} from "../models/user/logsession";
import * as uuid from "uuid/v4";

export class AuthendicateContoller {


    public CheckUserInformation(req: any, res: Response, next) {


        if (req.path !== '/v1/user/authenticate/' ) {

console.log(req.header('Userinfo'));
        /*     if (req.header('Userinfo') !== 'undefined') {


               // let sess = JSON.parse(req.header('Userinfo'));

                sess.logged_at = new Date();

                // is client going through a proxy?
                if (req.headers['via']) {
                    sess.last_ip = req.headers['x-forwarded-for'];
                } else {
                    sess.last_ip = req.connection.remoteAddress;
                }

                UserSession.updateOne( {'_id':sess._id}, sess, (err: any, result: any) => {

                    if (!err && result.nModified != 0 ) {
                        next();
                    } else {
                        res.status(200).send({"accepted": false, "status": 401, "error_code": '', "message": 'Session has expired', "data": null });
                    }

                });
            } */

        }else{
            next();
        }

        // UserSession.create(sess, (err:any) => {
        //
        //     if (!err) {
        //         User.findOne( {'username':user.username}, {}, {}, (err:any,result:IUser) => {
        //
        //             if (result) {
        //                 //req.session = sess;
        //                 res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": sess });
        //             }else {
        //                 res.status(401).send({ "accepted": false, "status":401, "error_code":'', "message": 'Invalid User Name or Password', "data":  null });
        //             }
        //         });
        //     }else{
        //
        //         res.status(401).send({ "accepted": false, "status":401, "error_code":'', "message": 'User already logged in', "data":  null });
        //     }
        //
        // });
		 next();

    }


    public Logout(req: any, res: Response) {

        let info = JSON.parse(req.header('Userinfo'));

        UserSession.deleteOne({'username': info.username}, (err: any) => {
            res.status(200).send({"accepted": true, "status": 200, "error_code": '', "message": '', "data": null});
        });
    }

    public Login(req: any, res: Response) {


        let user = new User();

        let sess = new UserSession();

        user.username = req.body.username;
        user.password = req.body.password;


        sess.ses_id = uuid();
        sess.logged_at = new Date();
        sess.username = req.body.username;

        // is client going through a proxy?
        if (req.headers['via']) {
            sess.last_ip = req.headers['x-forwarded-for'];
        } else {
            sess.last_ip = req.connection.remoteAddress;
        }


        //Check the UserName & Password
        User.findOne({'username': user.username}, {}, {}, (err: any, result: IUser) => {

            if (result) {


                //Create the User Session in db
                UserSession.create(sess, (err: any, mysess: IUserSession) => {

                    if (!err) {
                        res.status(200).send({ "accepted": true, "status": 200, "error_code": '', "message": '', "data": sess });
                    } else {
                        res.status(401).send({ "accepted": false,  "status": 401, "error_code": '', "message": 'Invalid User Name or Password', "data": null });
                    }
                });

            } else {
                res.status(401).send({
                    "accepted": false,
                    "status": 401,
                    "error_code": '',
                    "message": 'Invalid User Name or Password',
                    "data": null
                });
            }
        });


        // UserSession.create(sess, (err:any) => {
        //
        //     if (!err) {
        //         User.findOne( {'username':user.username}, {}, {}, (err:any,result:IUser) => {
        //
        //             if (result) {
        //                 //req.session = sess;
        //                 res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": sess });
        //             }else {
        //                 res.status(401).send({ "accepted": false, "status":401, "error_code":'', "message": 'Invalid User Name or Password', "data":  null });
        //             }
        //         });
        //     }else{
        //
        //         res.status(401).send({ "accepted": false, "status":401, "error_code":'', "message": 'User already logged in', "data":  null });
        //     }
        //
        // });

    }

}

export const authendicateContoller = new AuthendicateContoller();
