import { Request, Response } from "express";
import Course from '../models/course/course';
import CourseTable from '../models/course/course_table';
import Country, {ICountry} from "../models/country/country";

export class CourseController {

    public async findAll(req: Request, res: Response) {

        Course.aggregate([
            {
                "$project" : {
                    "_id": 0,
                    "cc" : "$code"
                }
            },
            {
                "$sort": {"_id": 1}
            }
        ],function(err,result) {
            if (!err){

                if (result.length > 0){
                    let c = result[result.length - 1];
                    //'COU' + (parseInt(c.replace('COU','')) + 1);
                    console.log(c.cc.replace('COU',''));
                }else{

                }


            }
        });

        let courses = Course.find((err: any, courses: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": courses});
            }
        });
    }

    public async findByCode(req: Request, res: Response) {

        let course = Course.findById(req.params.code, (err: any, course: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": course });
            }
        });
    }

    public async findAllByCountry(req: Request, res: Response) {

        const code = req.params.code;

        Course.aggregate([
            {
                "$match" : {
                    "cou_cd": code
                }
            }
        ],function(err,result) {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": result});
            }
        });
    }

    public addCourse = (req: Request, res: Response) => {
        var course = new Course(req.body);

        var courseTable = new CourseTable();

        courseTable.ai =1;
        courseTable.code = 'COU1';
        courseTable.name = course.name
        courseTable.cou_cd = course.country.code;


        CourseTable.findOne( {}, {}, {}, (err:any,result:ICountry) => {
            if (result) {
                courseTable.ai = result.ai + 1;
                courseTable.code = 'COU' + courseTable.ai;
            }

            courseTable.save((err: any) => {
                if (err) {
                    res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
                } else {
                    res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": courseTable });
                }
            });

        }).sort({"ai":-1}).limit(1);

    };

    public updateCourse = (req: Request, res: Response) => {
        var course = new Course(req.body);

        var courseTable = new CourseTable();
        courseTable._id = course._id
        courseTable.code = course.code;
        courseTable.name = course.name
        courseTable.cou_cd = course.country.code;

        courseTable.updateOne(courseTable,(err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": courseTable });
            }
        });
    };

    public removeCourse = (req: Request, res: Response) => {
        var course = new Course(req.body);


        CourseTable.findByIdAndDelete(course._id, (err: any) => {
            if (err) {
                res.status(200).send({ "accepted": false,  "status":500, "error_code":'', "message": err.toString(), "data": null });
            } else {
                res.status(200).send({ "accepted": true,  "status":200, "error_code":'', "message": '', "data": course });
            }
        });

    };


}

export const courseController = new CourseController ();
