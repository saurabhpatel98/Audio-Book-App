import * as express from "express";
import * as session   from "express-session";
import { mainController } from "../controllers/MainController";
import {countryController} from "../controllers/CountryController";
import {courseController} from "../controllers/CourseControlller";
import {raceController} from "../controllers/RaceController";
import {rcmController} from "../controllers/RcmController";
import {bettypeController} from "../controllers/BetTypeController";
import {subsplanController} from "../controllers/SubsPlanController";
import {subsPeriodController} from "../controllers/SubsPeriodController";
import {subsTypeController} from "../controllers/SubsTypeController";
import {subsMapController} from "../controllers/SubsMapController";
import {membershipController} from "../controllers/MembershipController";
import {authendicateContoller} from "../controllers/AuthendicateContoller";
import {betselectionController} from "../controllers/BetSelectionController";
import {runningSelectionController} from "../controllers/RunningSelectionController";
import {booksController} from "../controllers/BooksController";
import {filesController} from "../controllers/FilesController";
import {stateController} from "../controllers/StateController";
import {cityController} from "../controllers/CityController";
import {feeController} from "../controllers/FeeController";
import {byratingController} from "../controllers/ByratingController";
import {ownershipController} from "../controllers/OwnershipController";
import {collegesController} from "../controllers/CollegesController";
import {streamsController} from "../controllers/StreamsController";
import {specializationController} from "../controllers/SpecializationController";
import {coursesController} from "../controllers/CoursesController";
import {courseslevelController} from "../controllers/CourseslevelController";
import {studymodeController} from "../controllers/StudymodeController";
import {facilitiesController} from "../controllers/FacilitiesController";
import {productsController} from "../controllers/ProductsController";
import {memberregController} from "../controllers/MemberregController";
import {collegeinfoController} from "../controllers/CollegeinfoController";
import {collegecoursesController} from "../controllers/CollegecoursesController";
import {collegeplacementsController} from "../controllers/CollegeplacementsController";
import {collegefacilitiesController} from "../controllers/CollegefacilitiesController";
import {examsController} from "../controllers/ExamsController";
import {blogsController} from "../controllers/BlogsController";
import {newsController} from "../controllers/NewsController";
import {testimonialsController} from "../controllers/TestimonialsController";
import {pagesController} from "../controllers/PagesController";
import {sectionsController} from "../controllers/SectionController";
import {browsebyaboutController} from "../controllers/BrowsebyaboutController";
import {placementsnewsController} from "../controllers/PlacementsnewsController";
import {curriculumController} from "../controllers/CurriculumController";
import {eligibilityController} from "../controllers/EligibilityController";
import {moredetailsController} from "../controllers/MoredetailsController";
import {placementsController} from "../controllers/PlacementsController";
import {homebannermenuController} from "../controllers/HomebannermenuController";
import {aboutoverviewController} from "../controllers/AboutoverviewContoller";
import {rankingsController} from "../controllers/RankingsController";
import {leadershipController} from "../controllers/LeadershipController";
import {committesController} from "../controllers/CommittesController";
import {studentstoriesController} from "../controllers/StudentstoriesController";
import {campusoverviewController} from "../controllers/CampusoverviewController";
import {facilitiesoverviewController} from "../controllers/FacilitiesoverviewController";
import {homeranksectionController} from "../controllers/HomeranksectionController";
import {studentsplacedController} from "../controllers/StudentsPlacedController";
import {otherinfoController} from "../controllers/PlacementsOtherinfoController";
import {placementsoverviewController} from "../controllers/PlacementsOverviewController";
import {academicsController} from "../controllers/AcademicsContoller";
import {facultyController} from "../controllers/FacultyController";
import {uploadsController} from "../controllers/UploadsController";
import {engineeringpageController} from "../controllers/EngineeringpageController";
import {advancedengineeringController} from "../controllers/AdvancedengineeringContoller";

        // var express = require('express');
        // var router = express.Router();
        var multer  = require('multer');
        var storage = multer.diskStorage({
            destination: (req, file, cb) => {
            cb(null, './src/images');
            },
            filename: (req, file, cb) => {
            /* console.log(file);
            var filetype = '';
            if(file.mimetype === 'image/gif') {
                filetype = 'gif';
            }
            if(file.mimetype === 'image/png') {
                filetype = 'png';
            }
            if(file.mimetype === 'image/jpeg') {
                filetype = 'jpg';
            } */
            cb(null, file.originalname);
            }
        });
        var upload = multer({storage: storage});

class MainRoutes {
    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }


    private config(): void {

        this.router.post("/blogsupload/",upload.single('image'), (req: express.Request, res: express.Response) =>
            uploadsController.addUploads(req, res)
        );

        this.router.get("/", (req: express.Request, res: express.Response) =>
            mainController.root(req, res)
        );

        // API Country
        this.router.get("/country/", (req: express.Request, res: express.Response) =>
            countryController.findAll(req, res)
        );

        this.router.get("/country/fromcourse/", (req: express.Request, res: express.Response) =>
            countryController.findAllFromCourse(req, res)
        );


        this.router.get("/country/:code/", (req: express.Request, res: express.Response) =>
            countryController.findByCode(req, res)
        );

        this.router.post("/country/", (req: express.Request, res: express.Response) =>
            countryController.addCountry(req, res)
        );

        this.router.put("/country/", (req: express.Request, res: express.Response) =>
            countryController.updateCountry(req, res)
        );

        this.router.delete("/country/", (req: express.Request, res: express.Response) =>
            countryController.removeCountry(req, res)
        );

        // API State
        this.router.get("/state/", (req: express.Request, res: express.Response) =>
            stateController.findAll(req, res)
        );

        this.router.get("/state/:id/", (req: express.Request, res: express.Response) =>
            stateController.findByCode(req, res)
        );

        this.router.get("/statec/:country/", (req: express.Request, res: express.Response) =>
            stateController.findAllByCountry(req, res)
        );

        this.router.post("/state/", (req: express.Request, res: express.Response) =>
            stateController.addState(req, res)
        );

        this.router.put("/state/", (req: express.Request, res: express.Response) =>
            stateController.updateState(req, res)
        );

        this.router.delete("/state/", (req: express.Request, res: express.Response) =>
            stateController.removeState(req, res)
        );

        // API City
        this.router.get("/city/", (req: express.Request, res: express.Response) =>
            cityController.findAll(req, res)
        );

        this.router.get("/city/:id/", (req: express.Request, res: express.Response) =>
            cityController.findByCode(req, res)
        );
        
        this.router.get("/citys/:state/", (req: express.Request, res: express.Response) =>
            cityController.findAllByState(req, res)
        );
        
        this.router.get("/cityc/:country/", (req: express.Request, res: express.Response) =>
            cityController.findAllByCountry(req, res)
        );

        this.router.post("/city/", (req: express.Request, res: express.Response) =>
            cityController.addCity(req, res)
        );

        this.router.put("/city/", (req: express.Request, res: express.Response) =>
            cityController.updateCity(req, res)
        );

        this.router.delete("/city/", (req: express.Request, res: express.Response) =>
            cityController.removeCity(req, res)
        );

        // API Fee
        this.router.get("/fee/", (req: express.Request, res: express.Response) =>
            feeController.findAll(req, res)
        );

        this.router.get("/feebyid/:id/", (req: express.Request, res: express.Response) =>
            feeController.findById(req, res)
        );

        this.router.get("/feecoursebyid/:id/", (req: express.Request, res: express.Response) =>
            feeController.findByCourseId(req, res)
        );

        this.router.post("/fee/", (req: express.Request, res: express.Response) =>
            feeController.addFee(req, res)
        );

        this.router.put("/fee/", (req: express.Request, res: express.Response) =>
            feeController.updateFee(req, res)
        );

        this.router.delete("/fee/", (req: express.Request, res: express.Response) =>
            feeController.removeFee(req, res)
        );

        // API Byrating
        this.router.get("/byrating/", (req: express.Request, res: express.Response) =>
            byratingController.findAll(req, res)
        );

        this.router.get("/byrating/:id/", (req: express.Request, res: express.Response) =>
            byratingController.findByCode(req, res)
        );

        this.router.post("/byrating/", (req: express.Request, res: express.Response) =>
            byratingController.addByrating(req, res)
        );

        this.router.put("/byrating/", (req: express.Request, res: express.Response) =>
            byratingController.updateByrating(req, res)
        );

        this.router.delete("/byrating/", (req: express.Request, res: express.Response) =>
            byratingController.removeByrating(req, res)
        );

        // API Ownership
        this.router.get("/ownership/", (req: express.Request, res: express.Response) =>
            ownershipController.findAll(req, res)
        );

        this.router.get("/ownership/:id/", (req: express.Request, res: express.Response) =>
            ownershipController.findByCode(req, res)
        );

        this.router.post("/ownership/", (req: express.Request, res: express.Response) =>
            ownershipController.addOwnership(req, res)
        );

        this.router.put("/ownership/", (req: express.Request, res: express.Response) =>
            ownershipController.updateOwnership(req, res)
        );

        this.router.delete("/ownership/", (req: express.Request, res: express.Response) =>
            ownershipController.removeOwnership(req, res)
        );

        // API Colleges
        this.router.get("/colleges/", (req: express.Request, res: express.Response) =>
            collegesController.findAll(req, res)
        );

        this.router.get("/colleges/:id/", (req: express.Request, res: express.Response) =>
            collegesController.findByCode(req, res)
        );

        this.router.post("/colleges/", (req: express.Request, res: express.Response) =>
            collegesController.addColleges(req, res)
        );

        this.router.put("/colleges/", (req: express.Request, res: express.Response) =>
            collegesController.updateColleges(req, res)
        );

        this.router.delete("/colleges/", (req: express.Request, res: express.Response) =>
            collegesController.removeColleges(req, res)
        );

        // API Streams
        this.router.get("/streams/", (req: express.Request, res: express.Response) =>
            streamsController.findAll(req, res)
        );

        this.router.get("/streams/:id/", (req: express.Request, res: express.Response) =>
            streamsController.findByCode(req, res)
        );

        this.router.post("/streams/", (req: express.Request, res: express.Response) =>
            streamsController.addStreams(req, res)
        );

        this.router.put("/streams/", (req: express.Request, res: express.Response) =>
            streamsController.updateStreams(req, res)
        );

        this.router.delete("/streams/", (req: express.Request, res: express.Response) =>
            streamsController.removeStreams(req, res)
        );

        // API Specialization
        this.router.get("/specialization/", (req: express.Request, res: express.Response) =>
            specializationController.findAll(req, res)
        );

        this.router.get("/specialization/:id/", (req: express.Request, res: express.Response) =>
            specializationController.findByCode(req, res)
        );

        this.router.get("/specializationc/:course/", (req: express.Request, res: express.Response) =>
            specializationController.findByCourse(req, res)
        );

        this.router.post("/specialization/", (req: express.Request, res: express.Response) =>
            specializationController.addSpecialization(req, res)
        );

        this.router.put("/specialization/", (req: express.Request, res: express.Response) =>
            specializationController.updateSpecialization(req, res)
        );

        this.router.delete("/specialization/", (req: express.Request, res: express.Response) =>
            specializationController.removeSpecialization(req, res)
        );

         // API Course
        this.router.get("/courses/", (req: express.Request, res: express.Response) =>
            coursesController.findAll(req, res)
        );

        this.router.get("/coursess/:stream", (req: express.Request, res: express.Response) =>
            coursesController.findByStream(req, res)
        );

        this.router.get("/coursebyid/:id/", (req: express.Request, res: express.Response) =>
            coursesController.findById(req, res)
        );
        this.router.get("/coursebyname/:course/", (req: express.Request, res: express.Response) =>
            coursesController.findByName(req, res)
        );

        this.router.post("/courses/", (req: express.Request, res: express.Response) =>
            coursesController.addCourses(req, res)
        );

        this.router.put("/courses/", (req: express.Request, res: express.Response) =>
            coursesController.updateCourses(req, res)
        );

        this.router.delete("/courses/", (req: express.Request, res: express.Response) =>
            coursesController.removeCourses(req, res)
        );

         // API Course
        this.router.get("/courseslevel/", (req: express.Request, res: express.Response) =>
            courseslevelController.findAll(req, res)
        );

        this.router.get("/courseslevel/:code/", (req: express.Request, res: express.Response) =>
            courseslevelController.findByCode(req, res)
        );

        this.router.post("/courseslevel/", (req: express.Request, res: express.Response) =>
            courseslevelController.addCourseslevel(req, res)
        );

        this.router.put("/courseslevel/", (req: express.Request, res: express.Response) =>
            courseslevelController.updateCourseslevel(req, res)
        );

        this.router.delete("/courseslevel/", (req: express.Request, res: express.Response) =>
            courseslevelController.removeCourseslevel(req, res)
        );

         // API Course
        this.router.get("/studymode/", (req: express.Request, res: express.Response) =>
            studymodeController.findAll(req, res)
        );

        this.router.get("/studymode/:code/", (req: express.Request, res: express.Response) =>
            studymodeController.findByCode(req, res)
        );

        this.router.post("/studymode/", (req: express.Request, res: express.Response) =>
            studymodeController.addStudymode(req, res)
        );

        this.router.put("/studymode/", (req: express.Request, res: express.Response) =>
            studymodeController.updateStudymode(req, res)
        );

        this.router.delete("/studymode/", (req: express.Request, res: express.Response) =>
            studymodeController.removeStudymode(req, res)
        );

         // API Course
        this.router.get("/facilities/", (req: express.Request, res: express.Response) =>
            facilitiesController.findAll(req, res)
        );

        this.router.get("/facilities/:code/", (req: express.Request, res: express.Response) =>
            facilitiesController.findByCode(req, res)
        );

        this.router.post("/facilities/", (req: express.Request, res: express.Response) =>
            facilitiesController.addFacilities(req, res)
        );

        this.router.put("/facilities/", (req: express.Request, res: express.Response) =>
            facilitiesController.updateFacilities(req, res)
        );

        this.router.delete("/facilities/", (req: express.Request, res: express.Response) =>
            facilitiesController.removeFacilities(req, res)
        );

         // API Course
        this.router.get("/products/", (req: express.Request, res: express.Response) =>
            productsController.findAll(req, res)
        );

        this.router.get("/products/:code/", (req: express.Request, res: express.Response) =>
            productsController.findByCode(req, res)
        );

        this.router.post("/products/", (req: express.Request, res: express.Response) =>
            productsController.addProducts(req, res)
        );

        this.router.put("/products/", (req: express.Request, res: express.Response) =>
            productsController.updateProducts(req, res)
        );

        this.router.delete("/products/", (req: express.Request, res: express.Response) =>
            productsController.removeProducts(req, res)
        );

         // API Memberreg
        this.router.get("/memberreg/", (req: express.Request, res: express.Response) =>
            memberregController.findAll(req, res)
        );

        this.router.get("/memberreg/:code/", (req: express.Request, res: express.Response) =>
            memberregController.findByCode(req, res)
        );

        this.router.post("/memberreg/", (req: express.Request, res: express.Response) =>
            memberregController.addMemberreg(req, res)
        );

        this.router.put("/memberreg/", (req: express.Request, res: express.Response) =>
            memberregController.updateMemberreg(req, res)
        );

        this.router.delete("/memberreg/", (req: express.Request, res: express.Response) =>
            memberregController.removeMemberreg(req, res)
        );
        
        this.router.post("/member/", (req: express.Request, res: express.Response) =>
            memberregController.login(req, res)
        );

         // API collegecourses
        this.router.get("/collegecourses/", (req: express.Request, res: express.Response) =>
        collegecoursesController.findAll(req, res)
        );

        this.router.get("/collegecourses/:code/", (req: express.Request, res: express.Response) =>
        collegecoursesController.findByCode(req, res)
        );

        this.router.post("/collegecourses/", (req: express.Request, res: express.Response) =>
        collegecoursesController.addCollegecourses(req, res)
        );

        this.router.put("/collegecourses/", (req: express.Request, res: express.Response) =>
        collegecoursesController.updateCollegecourses(req, res)
        );

        this.router.delete("/collegecourses/", (req: express.Request, res: express.Response) =>
        collegecoursesController.removeCollegecourses(req, res)
        );

        this.router.post("/collegeinfo/", (req: express.Request, res: express.Response) =>
            collegeinfoController.addCollegeinfo(req, res)
        );

        this.router.get("/collegebyid/:collegeid", (req: express.Request, res: express.Response) =>
            collegeinfoController.findByCollegeId(req, res)
        );

        this.router.get("/collegeinfoall/", (req: express.Request, res: express.Response) =>
            collegeinfoController.findAllFromCollegeinfo(req, res)
        );

         // API collegeplacements
        this.router.get("/collegeplacements/", (req: express.Request, res: express.Response) =>
        collegeplacementsController.findAll(req, res)
        );

        this.router.get("/collegeplacements/:code/", (req: express.Request, res: express.Response) =>
        collegeplacementsController.findByCode(req, res)
        );

        this.router.post("/collegeplacements/", (req: express.Request, res: express.Response) =>
        collegeplacementsController.addCollegeplacements(req, res)
        );

        this.router.put("/collegeplacements/", (req: express.Request, res: express.Response) =>
        collegeplacementsController.updateCollegeplacements(req, res)
        );

        this.router.delete("/collegeplacements/", (req: express.Request, res: express.Response) =>
        collegeplacementsController.removeCollegeplacements(req, res)
        );

         // API collegeplacements
        this.router.get("/collegefacilities/", (req: express.Request, res: express.Response) =>
        collegefacilitiesController.findAll(req, res)
        );

        this.router.get("/collegefacilities/:code/", (req: express.Request, res: express.Response) =>
        collegefacilitiesController.findByCode(req, res)
        );

        this.router.post("/collegefacilities/", (req: express.Request, res: express.Response) =>
        collegefacilitiesController.addCollegefacilities(req, res)
        );

        this.router.put("/collegefacilities/", (req: express.Request, res: express.Response) =>
        collegefacilitiesController.updateCollegefacilities(req, res)
        );

        this.router.delete("/collegefacilities/", (req: express.Request, res: express.Response) =>
        collegefacilitiesController.removeCollegefacilities(req, res)
        );

         // API collegeplacements
        this.router.get("/exams/", (req: express.Request, res: express.Response) =>
        examsController.findAll(req, res)
        );

        this.router.get("/exams/:code/", (req: express.Request, res: express.Response) =>
        examsController.findByCode(req, res)
        );

        this.router.post("/exams/", (req: express.Request, res: express.Response) =>
        examsController.addExams(req, res)
        );

        this.router.put("/exams/", (req: express.Request, res: express.Response) =>
        examsController.updateExams(req, res)
        );

        this.router.delete("/exams/", (req: express.Request, res: express.Response) =>
        examsController.removeExams(req, res)
        );

         // API collegeplacements
        this.router.get("/blogs/", (req: express.Request, res: express.Response) =>
        blogsController.findAll(req, res)
        );

        this.router.get("/blogsbyid/:id/", (req: express.Request, res: express.Response) =>
        blogsController.findById(req, res)
        );

        this.router.post("/blogs/",upload.single('image'), (req: express.Request, res: express.Response) =>
        blogsController.addBlogs(req, res)
        );


        this.router.put("/blogs/", (req: express.Request, res: express.Response) =>
        blogsController.updateBlogs(req, res)
        );

        this.router.delete("/blogs/", (req: express.Request, res: express.Response) =>
        blogsController.removeBlogs(req, res)
        );
         // API news
        this.router.get("/news/", (req: express.Request, res: express.Response) =>
        newsController.findAll(req, res)
        );

        this.router.get("/newsfindbypriority/:priority/", (req: express.Request, res: express.Response) =>
        newsController.findByPriority(req, res)
        );

        this.router.get("/newsbyid/:id/", (req: express.Request, res: express.Response) =>
        newsController.findById(req, res)
        );

        this.router.post("/news/", (req: express.Request, res: express.Response) =>
        newsController.addNews(req, res)
        );

        this.router.put("/news/", (req: express.Request, res: express.Response) =>
        newsController.updateNews(req, res)
        );

        this.router.delete("/news/", (req: express.Request, res: express.Response) =>
        newsController.removeNews(req, res)
        );
         // API testimonials
        this.router.get("/testimonials/", (req: express.Request, res: express.Response) =>
        testimonialsController.findAll(req, res)
        );

        this.router.get("/testimonials/:code/", (req: express.Request, res: express.Response) =>
        testimonialsController.findByCode(req, res)
        );

        this.router.post("/testimonials/", (req: express.Request, res: express.Response) =>
        testimonialsController.addTestimonials(req, res)
        );

        this.router.put("/testimonials/", (req: express.Request, res: express.Response) =>
        testimonialsController.updateTestimonials(req, res)
        );

        this.router.delete("/testimonials/", (req: express.Request, res: express.Response) =>
        testimonialsController.removeTestimonials(req, res)
        );
         // API testimonials
        this.router.get("/pages/", (req: express.Request, res: express.Response) =>
        pagesController.findAll(req, res)
        );

        this.router.get("/pagesbyid/:id/", (req: express.Request, res: express.Response) =>
        pagesController.findById(req, res)
        );

        this.router.post("/pages/", (req: express.Request, res: express.Response) =>
        pagesController.addPages(req, res)
        );

        this.router.put("/pages/", (req: express.Request, res: express.Response) =>
        pagesController.updatePages(req, res)
        );

        this.router.delete("/pages/", (req: express.Request, res: express.Response) =>
        pagesController.removePages(req, res)
        );
         // API testimonials
        this.router.get("/sections/", (req: express.Request, res: express.Response) =>
        sectionsController.findAll(req, res)
        );

        this.router.get("/sectionsbyid/:id/", (req: express.Request, res: express.Response) =>
        sectionsController.findById(req, res)
        );

        this.router.get("/sectionsbypageid/:id/:pageid", (req: express.Request, res: express.Response) =>
        sectionsController.findByPageId(req, res)
        );

        this.router.post("/sections/", (req: express.Request, res: express.Response) =>
        sectionsController.addSections(req, res)
        );

        this.router.put("/sections/", (req: express.Request, res: express.Response) =>
        sectionsController.updateSections(req, res)
        );

        this.router.delete("/sections/", (req: express.Request, res: express.Response) =>
        sectionsController.removeSections(req, res)
        );
         // API testimonials
        this.router.get("/browsebyabout/", (req: express.Request, res: express.Response) =>
        browsebyaboutController.findAll(req, res)
        );

        this.router.get("/browsebyaboutbyid/:id/", (req: express.Request, res: express.Response) =>
        browsebyaboutController.findByCode(req, res)
        );

        this.router.post("/browsebyabout/", (req: express.Request, res: express.Response) =>
        browsebyaboutController.addBrowsebyabout(req, res)
        );

        this.router.put("/browsebyabout/", (req: express.Request, res: express.Response) =>
        browsebyaboutController.updateBrowsebyabout(req, res)
        );

        this.router.delete("/browsebyabout/", (req: express.Request, res: express.Response) =>
        browsebyaboutController.removeBrowsebyabout(req, res)
        );
         // API testimonials
        this.router.get("/placementsnews/", (req: express.Request, res: express.Response) =>
        placementsnewsController.findAll(req, res)
        );

        this.router.get("/placementsnewsbyid/:id/", (req: express.Request, res: express.Response) =>
        placementsnewsController.findById(req, res)
        );

        this.router.get("/placementsnewsfindbypriority/:priority/", (req: express.Request, res: express.Response) =>
        placementsnewsController.findByPriority(req, res)
        );

        this.router.post("/placementsnews/", (req: express.Request, res: express.Response) =>
        placementsnewsController.addPlacementsnews(req, res)
        );

        this.router.put("/placementsnews/", (req: express.Request, res: express.Response) =>
        placementsnewsController.updatePlacementsnews(req, res)
        );

        this.router.delete("/placementsnews/", (req: express.Request, res: express.Response) =>
        placementsnewsController.removePlacementsnews(req, res)
        );
         // API testimonials
        this.router.get("/curriculum/", (req: express.Request, res: express.Response) =>
        curriculumController.findAll(req, res)
        );

        this.router.get("/curriculumbyid/:id/", (req: express.Request, res: express.Response) =>
        curriculumController.findById(req, res)
        );

        this.router.get("/curriculumcoursebyid/:id/", (req: express.Request, res: express.Response) =>
        curriculumController.findByCourseId(req, res)
        );

        this.router.post("/curriculum/", (req: express.Request, res: express.Response) =>
        curriculumController.addCurriculum(req, res)
        );

        this.router.put("/curriculum/", (req: express.Request, res: express.Response) =>
        curriculumController.updateCurriculum(req, res)
        );

        this.router.delete("/curriculum/", (req: express.Request, res: express.Response) =>
        curriculumController.removeCurriculum(req, res)
        );
         // API Eligibility
        this.router.get("/eligibility/", (req: express.Request, res: express.Response) =>
        eligibilityController.findAll(req, res)
        );

        this.router.get("/eligibilitybyid/:id/", (req: express.Request, res: express.Response) =>
        eligibilityController.findById(req, res)
        );
        
        this.router.get("/eligibilitycoursebyid/:id/", (req: express.Request, res: express.Response) =>
        eligibilityController.findByCourseId(req, res)
        );

        this.router.post("/eligibility/", (req: express.Request, res: express.Response) =>
        eligibilityController.addEligibility(req, res)
        );

        this.router.put("/eligibility/", (req: express.Request, res: express.Response) =>
        eligibilityController.updateEligibility(req, res)
        );

        this.router.delete("/eligibility/", (req: express.Request, res: express.Response) =>
        eligibilityController.removeEligibility(req, res)
        );
         // API Eligibility
        this.router.get("/moredetails/", (req: express.Request, res: express.Response) =>
        moredetailsController.findAll(req, res)
        );

        this.router.get("/moredetailsbyid/:id/", (req: express.Request, res: express.Response) =>
        moredetailsController.findById(req, res)
        );

        this.router.get("/moredetailscoursebyid/:id/", (req: express.Request, res: express.Response) =>
        moredetailsController.findByCourseId(req, res)
        );

        this.router.post("/moredetails/", (req: express.Request, res: express.Response) =>
        moredetailsController.addMoredetails(req, res)
        );

        this.router.put("/moredetails/", (req: express.Request, res: express.Response) =>
        moredetailsController.updateMoredetails(req, res)
        );

        this.router.delete("/moredetails/", (req: express.Request, res: express.Response) =>
        moredetailsController.removeMoredetails(req, res)
        );
         // API Eligibility
        this.router.get("/placements/", (req: express.Request, res: express.Response) =>
        placementsController.findAll(req, res)
        );
        this.router.get("/placementslimit12/", (req: express.Request, res: express.Response) =>
        placementsController.findlimit12(req, res)
        );

        this.router.get("/placementsbyid/:id/", (req: express.Request, res: express.Response) =>
        placementsController.findById(req, res)
        );

        this.router.get("/placementscoursebyid/:id/", (req: express.Request, res: express.Response) =>
        placementsController.findByCourseId(req, res)
        );

        this.router.get("/findexistingkeyinplacements/", (req: express.Request, res: express.Response) =>
        placementsController.findForExistingKey(req, res)
        );

        this.router.get("/findexistingsectorkey/", (req: express.Request, res: express.Response) =>
        placementsController.findForExistingSectorKey(req, res)
        );

        this.router.post("/placements/", (req: express.Request, res: express.Response) =>
        placementsController.addPlacements(req, res)
        );

        this.router.put("/placements/", (req: express.Request, res: express.Response) =>
        placementsController.updatePlacements(req, res)
        );

        this.router.delete("/placements/", (req: express.Request, res: express.Response) =>
        placementsController.removePlacements(req, res)
        );
         // API Homebannermenu
        this.router.get("/homebannermenu/", (req: express.Request, res: express.Response) =>
        homebannermenuController.findAll(req, res)
        );

        this.router.get("/homebannermenufindone/", (req: express.Request, res: express.Response) =>
        homebannermenuController.findOne(req, res)
        );

        this.router.post("/homebannermenu/", (req: express.Request, res: express.Response) =>
        homebannermenuController.addHomebannermenu(req, res)
        );

        this.router.put("/homebannermenu/", (req: express.Request, res: express.Response) =>
        homebannermenuController.updateHomebannermenu(req, res)
        );

        this.router.delete("/homebannermenu/", (req: express.Request, res: express.Response) =>
        homebannermenuController.removeHomebannermenu(req, res)
        );
         // API Aboutusoverview
        this.router.get("/aboutoverview/", (req: express.Request, res: express.Response) =>
        aboutoverviewController.findAll(req, res)
        );

        this.router.get("/aboutoverviewfindone/", (req: express.Request, res: express.Response) =>
        aboutoverviewController.findOne(req, res)
        );

        this.router.post("/aboutoverview/", (req: express.Request, res: express.Response) =>
        aboutoverviewController.addAboutoverview(req, res)
        );

        this.router.put("/aboutoverview/", (req: express.Request, res: express.Response) =>
        aboutoverviewController.updateAboutoverview(req, res)
        );

        this.router.delete("/aboutoverview/", (req: express.Request, res: express.Response) =>
        aboutoverviewController.removeAboutoverview(req, res)
        );
        // API Eligibility
        this.router.get("/rankings/", (req: express.Request, res: express.Response) =>
        rankingsController.findAll(req, res)
        );

        this.router.get("/rankingsbyid/:id/", (req: express.Request, res: express.Response) =>
        rankingsController.findById(req, res)
        );

        this.router.post("/rankings/", (req: express.Request, res: express.Response) =>
        rankingsController.addRankings(req, res)
        );

        this.router.put("/rankings/", (req: express.Request, res: express.Response) =>
        rankingsController.updateRankings(req, res)
        );

        this.router.delete("/rankings/", (req: express.Request, res: express.Response) =>
        rankingsController.removeRankings(req, res)
        );
        // API Eligibility
        this.router.get("/leadership/", (req: express.Request, res: express.Response) =>
        leadershipController.findAll(req, res)
        );

        this.router.get("/leadershipbyid/:id/", (req: express.Request, res: express.Response) =>
        leadershipController.findById(req, res)
        );

        this.router.get("/leadershipbydes/:designation/", (req: express.Request, res: express.Response) =>
        leadershipController.findByDes(req, res)
        );

        this.router.get("/leadershipbytype/:type/", (req: express.Request, res: express.Response) =>
        leadershipController.findByType(req, res)
        );

        this.router.post("/leadership/", (req: express.Request, res: express.Response) =>
        leadershipController.addLeadership(req, res)
        );

        this.router.put("/leadership/", (req: express.Request, res: express.Response) =>
        leadershipController.updateLeadership(req, res)
        );

        this.router.delete("/leadership/", (req: express.Request, res: express.Response) =>
        leadershipController.removeLeadership(req, res)
        );
        // API Eligibility
        this.router.get("/committes/", (req: express.Request, res: express.Response) =>
        committesController.findAll(req, res)
        );

        this.router.get("/committesbyid/:id/", (req: express.Request, res: express.Response) =>
        committesController.findById(req, res)
        );

        this.router.post("/committes/", (req: express.Request, res: express.Response) =>
        committesController.addCommittes(req, res)
        );

        this.router.put("/committes/", (req: express.Request, res: express.Response) =>
        committesController.updateCommittes(req, res)
        );

        this.router.delete("/committes/", (req: express.Request, res: express.Response) =>
        committesController.removeCommittes(req, res)
        );
        // API Eligibility
        this.router.get("/studentstories/", (req: express.Request, res: express.Response) =>
        studentstoriesController.findAll(req, res)
        );

        this.router.get("/studentstoriesbyid/:id/", (req: express.Request, res: express.Response) =>
        studentstoriesController.findById(req, res)
        );

        this.router.post("/studentstories/", (req: express.Request, res: express.Response) =>
        studentstoriesController.addStudentstories(req, res)
        );

        this.router.put("/studentstories/", (req: express.Request, res: express.Response) =>
        studentstoriesController.updateStudentstories(req, res)
        );

        this.router.delete("/studentstories/", (req: express.Request, res: express.Response) =>
        studentstoriesController.removeStudentstories(req, res)
        );
        // API Aboutusoverview
        this.router.get("/campusoverview/", (req: express.Request, res: express.Response) =>
        campusoverviewController.findAll(req, res)
        );

        this.router.get("/campusoverviewfindone/", (req: express.Request, res: express.Response) =>
        campusoverviewController.findOne(req, res)
        );

        this.router.post("/campusoverview/", (req: express.Request, res: express.Response) =>
        campusoverviewController.addCampusoverview(req, res)
        );

        this.router.put("/campusoverview/", (req: express.Request, res: express.Response) =>
        campusoverviewController.updateCampusoverview(req, res)
        );

        this.router.delete("/campusoverview/", (req: express.Request, res: express.Response) =>
        campusoverviewController.removeCampusoverview(req, res)
        );
         // API Facilitiesoverview
        this.router.get("/facilitiesoverview/", (req: express.Request, res: express.Response) =>
        facilitiesoverviewController.findAll(req, res)
        );

        this.router.get("/facilitiesoverviewbyid/:id/", (req: express.Request, res: express.Response) =>
        facilitiesoverviewController.findById(req, res)
        );

        this.router.post("/facilitiesoverview/", (req: express.Request, res: express.Response) =>
        facilitiesoverviewController.addFacilitiesoverview(req, res)
        );

        this.router.get("/findbyfacility/:facility", (req: express.Request, res: express.Response) =>
        facilitiesoverviewController.findByFacility(req, res)
        );

        this.router.put("/facilitiesoverview/", (req: express.Request, res: express.Response) =>
        facilitiesoverviewController.updateFacilitiesoverview(req, res)
        );

        this.router.delete("/facilitiesoverview/", (req: express.Request, res: express.Response) =>
        facilitiesoverviewController.removeFacilitiesoverview(req, res)
        );
         // API Homeranksection
         this.router.get("/homeranksection/", (req: express.Request, res: express.Response) =>
         homeranksectionController.findAll(req, res)
         );
 
         this.router.get("/homeranksectionfindone/", (req: express.Request, res: express.Response) =>
         homeranksectionController.findOne(req, res)
         );

         this.router.get("/homeranksectionbyid/:id", (req: express.Request, res: express.Response) =>
         homeranksectionController.findById(req, res)
         );
 
         this.router.post("/homeranksection/", (req: express.Request, res: express.Response) =>
         homeranksectionController.addHomeranksection(req, res)
         );
 
         this.router.put("/homeranksection/", (req: express.Request, res: express.Response) =>
         homeranksectionController.updateHomeranksection(req, res)
         );
 
         this.router.delete("/homeranksection/", (req: express.Request, res: express.Response) =>
         homeranksectionController.removeHomeranksection(req, res)
         );
          // API Students-placed-placements
        this.router.get("/students-placed/", (req: express.Request, res: express.Response) =>
        studentsplacedController.findAll(req, res)
        );

        this.router.get("/students-placedbyid/:id/", (req: express.Request, res: express.Response) =>
        studentsplacedController.findById(req, res)
        );

        this.router.post("/students-placed/", (req: express.Request, res: express.Response) =>
        studentsplacedController.addStudentsplaced(req, res)
        );

        this.router.put("/students-placed/", (req: express.Request, res: express.Response) =>
        studentsplacedController.updateStudentsplaced(req, res)
        );

        this.router.delete("/students-placed/", (req: express.Request, res: express.Response) =>
        studentsplacedController.removeStudentsplaced(req, res)
        );
          // API Students-placed-placements
        this.router.get("/placements-otherinfo/", (req: express.Request, res: express.Response) =>
        otherinfoController.findAll(req, res)
        );

        this.router.get("/placements-otherinfobyid/:id/", (req: express.Request, res: express.Response) =>
        otherinfoController.findById(req, res)
        );

        this.router.post("/placements-otherinfo/", (req: express.Request, res: express.Response) =>
        otherinfoController.addOtherinfo(req, res)
        );

        this.router.put("/placements-otherinfo/", (req: express.Request, res: express.Response) =>
        otherinfoController.updateOtherinfo(req, res)
        );

        this.router.delete("/placements-otherinfo/", (req: express.Request, res: express.Response) =>
        otherinfoController.removeOtherinfo(req, res)
        );

        this.router.get("/findbyplacementstype/:type", (req: express.Request, res: express.Response) =>
        otherinfoController.findByType(req, res)
        );

        // API placements-overview
        this.router.get("/placementsoverview/", (req: express.Request, res: express.Response) =>
        placementsoverviewController.findAll(req, res)
        );

        this.router.get("/placementsoverviewbyid/:id/", (req: express.Request, res: express.Response) =>
        placementsoverviewController.findById(req, res)
        );

        this.router.get("/placementsoverviewfindone/", (req: express.Request, res: express.Response) =>
        placementsoverviewController.findOne(req, res)
        );

        this.router.post("/placementsoverview/", (req: express.Request, res: express.Response) =>
        placementsoverviewController.addPlacementsoverview(req, res)
        );

        this.router.put("/placementsoverview/", (req: express.Request, res: express.Response) =>
        placementsoverviewController.updatePlacementsoverview(req, res)
        );

        this.router.delete("/placementsoverview/", (req: express.Request, res: express.Response) =>
        placementsoverviewController.removePlacementsoverview(req, res)
        );

        this.router.get("/academics/", (req: express.Request, res: express.Response) =>
        academicsController.findAll(req, res)
        );

        this.router.get("/academicsbyid/:id/", (req: express.Request, res: express.Response) =>
        academicsController.findById(req, res)
        );

        this.router.post("/academics/", (req: express.Request, res: express.Response) =>
        academicsController.addAcademics(req, res)
        );

        this.router.get("/findbyacademicstype/:type", (req: express.Request, res: express.Response) =>
        academicsController.findByType(req, res)
        );

        this.router.put("/academics/", (req: express.Request, res: express.Response) =>
        academicsController.updateAcademics(req, res)
        );

        this.router.delete("/academics/", (req: express.Request, res: express.Response) =>
        academicsController.removeAcademics(req, res)
        );

        this.router.get("/faculty/", (req: express.Request, res: express.Response) =>
        facultyController.findAll(req, res)
        );

        this.router.get("/facultybyid/:id/", (req: express.Request, res: express.Response) =>
        facultyController.findById(req, res)
        );

        this.router.post("/faculty/", (req: express.Request, res: express.Response) =>
        facultyController.addFaculty(req, res)
        );

        this.router.get("/findbyfaculty/:name", (req: express.Request, res: express.Response) =>
        facultyController.findByFaculty(req, res)
        );

        this.router.get("/findbydepartment/:department", (req: express.Request, res: express.Response) =>
        facultyController.findByDepartment(req, res)
        );

        this.router.put("/faculty/", (req: express.Request, res: express.Response) =>
        facultyController.updateFaculty(req, res)
        );

        this.router.delete("/faculty/", (req: express.Request, res: express.Response) =>
        facultyController.removeFaculty(req, res)
        );

         // API Homebannermenu
        this.router.get("/engineeringpage/", (req: express.Request, res: express.Response) =>
        engineeringpageController.findAll(req, res)
        );

        this.router.get("/engineeringpagefindone/", (req: express.Request, res: express.Response) =>
        engineeringpageController.findOne(req, res)
        );

        this.router.post("/engineeringpage/", (req: express.Request, res: express.Response) =>
        engineeringpageController.addEngineeringpage(req, res)
        );

        this.router.put("/engineeringpage/", (req: express.Request, res: express.Response) =>
        engineeringpageController.updateEngineeringpage(req, res)
        );

        this.router.delete("/engineeringpage/", (req: express.Request, res: express.Response) =>
        engineeringpageController.removeEngineeringpage(req, res)
        );
        // API Eligibility
        this.router.get("/advancedengineering/", (req: express.Request, res: express.Response) =>
        advancedengineeringController.findAll(req, res)
        );

        this.router.get("/advancedengineeringbyid/:id/", (req: express.Request, res: express.Response) =>
        advancedengineeringController.findById(req, res)
        );

        this.router.post("/advancedengineering/", (req: express.Request, res: express.Response) =>
        advancedengineeringController.addAdvancedengineering(req, res)
        );

        this.router.put("/advancedengineering/", (req: express.Request, res: express.Response) =>
        advancedengineeringController.updateAdvancedengineering(req, res)
        );

        this.router.delete("/advancedengineering/:id", (req: express.Request, res: express.Response) =>
        advancedengineeringController.removeAdvancedengineering(req, res)
        );















        this.router.post("/files/", (req: express.Request, res: express.Response) =>
            filesController.addFiles(req, res)
        );

        this.router.post("/user/authenticate/", (req: express.Request, res: express.Response) =>
            // authendicateContoller.Authendicate(req, res)
            authendicateContoller.Login(req,res)
        );

        this.router.get("/books/", (req: express.Request, res: express.Response) =>
            booksController.findAll(req, res)
        );

        this.router.get("/books/:code/", (req: express.Request, res: express.Response) =>
            booksController.findByCode(req, res)
        );

        this.router.post("/books/", (req: express.Request, res: express.Response) =>
            booksController.addBooks(req, res)
        );

        this.router.put("/books/", (req: express.Request, res: express.Response) =>
            booksController.updateBooks(req, res)
        );

        this.router.delete("/books/", (req: express.Request, res: express.Response) =>
            booksController.removeBooks(req, res)
        );

        // country End Point
       /*  this.router.get("/country/", (req: express.Request, res: express.Response) =>
            countryController.findAll(req, res)
        );

        this.router.get("/country/fromcourse/", (req: express.Request, res: express.Response) =>
            countryController.findAllFromCourse(req, res)
        );


        this.router.get("/country/:code/", (req: express.Request, res: express.Response) =>
            countryController.findByCode(req, res)
        );

        this.router.post("/country/", (req: express.Request, res: express.Response) =>
            countryController.addCountry(req, res)
        );

        this.router.put("/country/", (req: express.Request, res: express.Response) =>
            countryController.updateCountry(req, res)
        );

        this.router.delete("/country/", (req: express.Request, res: express.Response) =>
            countryController.removeCountry(req, res)
        ); */


        // Course End Point
        this.router.get("/course/", (req: express.Request, res: express.Response) =>
            courseController.findAll(req, res)
        );

        this.router.get("/course/country/:code/", (req: express.Request, res: express.Response) =>
            courseController.findAllByCountry(req, res)
        );

        this.router.get("/course/:code/", (req: express.Request, res: express.Response) =>
            courseController.findByCode(req, res)
        );

        this.router.post("/course/", (req: express.Request, res: express.Response) =>
            courseController.addCourse(req, res)
        );

        this.router.put("/course/", (req: express.Request, res: express.Response) =>
            courseController.updateCourse(req, res)
        );

        this.router.delete("/course/", (req: express.Request, res: express.Response) =>
            courseController.removeCourse(req, res)
        );

        // Race End Point
        this.router.get("/race/", (req: express.Request, res: express.Response) =>
            raceController.findAll(req, res)
        );

        /* this.router.get("/race/course/:code/", (req: express.Request, res: express.Response) =>
            raceController.findAllRacesFromRCM(req,res)
        ); */

        this.router.get("/race/:code/", (req: express.Request, res: express.Response) =>
            raceController.findByCode(req, res)
        );

        this.router.post("/race/", (req: express.Request, res: express.Response) =>
            raceController.addRace(req, res)
        );

        this.router.put("/race/", (req: express.Request, res: express.Response) =>
            raceController.updateRace(req, res)
        );

        this.router.delete("/race/", (req: express.Request, res: express.Response) =>
            raceController.removeRace(req, res)
        );

        // RCM End Point
        this.router.get("/rcm/", (req: express.Request, res: express.Response) =>
            rcmController.findAll(req, res)
        );

        this.router.get("/rcm/:code/", (req: express.Request, res: express.Response) =>
            rcmController.findByCode(req, res)
        );

        this.router.post("/rcm/", (req: express.Request, res: express.Response) =>
            rcmController.addRcm(req, res)
        );

        this.router.put("/rcm/", (req: express.Request, res: express.Response) =>
            rcmController.updateRcm(req, res)
        );

        this.router.delete("/rcm/", (req: express.Request, res: express.Response) =>
            rcmController.removeRcm(req, res)
        );

        // BetType End Point
        this.router.get("/bettype/", (req: express.Request, res: express.Response) =>
            bettypeController.findAll(req, res)
        );

        this.router.get("/bettype/:code/", (req: express.Request, res: express.Response) =>
            bettypeController.findByCode(req, res)
        );

        this.router.post("/bettype/", (req: express.Request, res: express.Response) =>
            bettypeController.addBetType(req, res)
        );

        this.router.put("/bettype/", (req: express.Request, res: express.Response) =>
            bettypeController.updateBetType(req, res)
        );

        this.router.delete("/bettype/", (req: express.Request, res: express.Response) =>
            bettypeController.removeBetType(req, res)
        );


        // SubscriptionPlan End Point
        this.router.get("/subsplan/", (req: express.Request, res: express.Response) =>
            subsplanController.findAll(req, res)
        );

        this.router.get("/subsplan/:code/", (req: express.Request, res: express.Response) =>
            subsplanController.findByCode(req, res)
        );

        this.router.post("/subsplan/", (req: express.Request, res: express.Response) =>
            subsplanController.addSubscriptionPlan(req, res)
        );

        this.router.put("/subsplan/", (req: express.Request, res: express.Response) =>
            subsplanController.updateSubscriptionPlan(req, res)
        );

        this.router.delete("/subsplan/", (req: express.Request, res: express.Response) =>
            subsplanController.removeSubscriptionPlan(req, res)
        );


        // SubscriptionPeriod End Point
        this.router.get("/subsperiod/", (req: express.Request, res: express.Response) =>
            subsPeriodController.findAll(req, res)
        );

        this.router.get("/subsperiod/:code/", (req: express.Request, res: express.Response) =>
            subsPeriodController.findByCode(req, res)
        );

        this.router.post("/subsperiod/", (req: express.Request, res: express.Response) =>
            subsPeriodController.addSubscriptionPeriod(req, res)
        );

        this.router.put("/subsperiod/", (req: express.Request, res: express.Response) =>
            subsPeriodController.updateSubscriptionPeriod(req, res)
        );

        this.router.delete("/subsperiod/", (req: express.Request, res: express.Response) =>
            subsPeriodController.removeSubscriptionPeriod(req, res)
        );

        // SubscriptionType End Point
        this.router.get("/substype/", (req: express.Request, res: express.Response) =>
            subsTypeController.findAll(req, res)
        );

        this.router.get("/substype/:code/", (req: express.Request, res: express.Response) =>
            subsTypeController.findByCode(req, res)
        );

        this.router.post("/substype/", (req: express.Request, res: express.Response) =>
            subsTypeController.addSubscriptionType(req, res)
        );

        this.router.put("/substype/", (req: express.Request, res: express.Response) =>
            subsTypeController.updateSubscriptionType(req, res)
        );

        this.router.delete("/substype/", (req: express.Request, res: express.Response) =>
            subsTypeController.removeSubscriptionType(req, res)
        );

        // SubscriptionMapping End Point
        this.router.get("/subsmap/", (req: express.Request, res: express.Response) =>
            subsMapController.findAll(req, res)
        );

        this.router.get("/subsmap/:code/", (req: express.Request, res: express.Response) =>
            subsMapController.findByCode(req, res)
        );

        this.router.post("/subsmap/", (req: express.Request, res: express.Response) =>
            subsMapController.addSubscriptionMapping(req, res)
        );

        this.router.put("/subsmap/", (req: express.Request, res: express.Response) =>
            subsMapController.updateSubscriptionMapping(req, res)
        );

        this.router.delete("/subsmap/", (req: express.Request, res: express.Response) =>
            subsMapController.removeSubscriptionMapping(req, res)
        );


        // Membership End Point
        this.router.get("/membership/", (req: express.Request, res: express.Response) =>
            membershipController.findAll(req, res)
        );

        this.router.get("/membership/:code/", (req: express.Request, res: express.Response) =>
            membershipController.findByCode(req, res)
        );

        this.router.post("/membership/", (req: express.Request, res: express.Response) =>
            membershipController.addMembership(req, res)
        );

        this.router.put("/membership/", (req: express.Request, res: express.Response) =>
            membershipController.updateMembership(req, res)
        );

        this.router.delete("/membership/", (req: express.Request, res: express.Response) =>
            membershipController.removeMembership(req, res)
        );


        //Bet Selection End Point
        this.router.get("/betselection/", (req: express.Request, res: express.Response) =>

            betselectionController.findAll(req, res)
        );

        this.router.get("/betselection/:code/", (req: express.Request, res: express.Response) =>
            betselectionController.findByCode(req, res)
        );

        this.router.post("/betselection/", (req: express.Request, res: express.Response) =>
            betselectionController.addBetSelection(req, res)
        );

        this.router.post("/betselections/", (req: express.Request, res: express.Response) =>
            betselectionController.addBetSelectionFromArray(req, res)
        );

        this.router.put("/betselection/", (req: express.Request, res: express.Response) =>
            betselectionController.updateBetSelection(req, res)
        );

        this.router.delete("/betselection/", (req: express.Request, res: express.Response) =>
            betselectionController.removeBetSelection(req, res)
        );


        //Running BetSelection End Point
        this.router.get("/runningbet/", (req: express.Request, res: express.Response) =>
            runningSelectionController.findAll(req, res)
        );

        this.router.get("/runningbet/:code/", (req: express.Request, res: express.Response) =>
            runningSelectionController.findByCode(req, res)
        );

        this.router.post("/runningbet/", (req: express.Request, res: express.Response) =>
            runningSelectionController.addRunSelection(req, res)
        );

        this.router.post("/runningbets/", (req: express.Request, res: express.Response) =>
            runningSelectionController.addRunSelectionFromArray(req, res)
        );

        this.router.post("/runningbet/", (req: express.Request, res: express.Response) =>
            runningSelectionController.addRunSelectionFromArray(req, res)
        );

        this.router.put("/runningbet/", (req: express.Request, res: express.Response) =>
            runningSelectionController.updateRunSelection(req, res)
        );

        this.router.delete("/runningbet/", (req: express.Request, res: express.Response) =>
            runningSelectionController.removeRunSelection(req, res)
        );

    }
}

export const mainRoutes = new MainRoutes().router;
