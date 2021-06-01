import * as express from "express";
import * as bodyParser from "body-parser";
import {mainRoutes} from "./routes/MainRoutes";
import * as cors from "cors";
import {mongo, Types} from "mongoose";
import MongoConnectionString from "./models/dbconnect";
import MongoStore from "connect-mongo";
import * as session from "express-session";
import * as uuid from "uuid/v4";
import * as cookieParser from "cookie-parser";
import {authendicateContoller} from "./controllers/AuthendicateContoller";

class App {
    public app: express.Application;

    public users: [string];

    constructor() {

        // this.users = Array;
        this.app = express();
        this.config();
    }


    private sessionChecker(req: any, res: express.Response, next) {


        if (req.session.user && req.cookies.user_sid) {
            res.redirect('/login');
        } else {
            next();
        }
    }

    private loggerMiddleware(req: any, res: express.Response, next) {

        // this.users.push(req.sessionID);

        //console.log(`${req.method} ${req.path}`);
        console.log(req.sessionID);

        next();
    }

    private config(): void {


        this.app.use(cookieParser());
        this.app.use(session({
            secret: "Who is this?!",
            genid: (req: any) => {
                // console.log('Inside the session middleware');

                // is client going through a proxy?
                //   if (req.headers['via']) { // yes
                //       console.log( req.headers['x-forwarded-for']);
                //       console.log(req.headers['via']);
                //   } else { // no
                //       console.log( req.connection.remoteAddress);
                //   }
                //
                // console.log( req.header('user-agent') );
                // console.log(req.connection.remoteAddress)
                // console.log(req.Session)

                return uuid(); // use UUIDs for session IDs
            },
            key: 'user_sid',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
            }
        }));

        this.app.use(bodyParser.json());
        this.app.use(cors());


        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({extended: false}));


        // This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
        // This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
        // this.app.use((req:any, res, next) => {
        //
        //     console.log('Middleware');
        //     ///user/authenticate/
        //     if (req.path !== '/v1/user/authenticate/' ){
        //         authendicateContoller.CheckUserInformation(req, res, next);
        //     }
        //     // next();
        // });

        this.app.use(authendicateContoller.CheckUserInformation);

        // Routing
        this.app.use("/v1/", mainRoutes);
    }
}

export default new App().app;
