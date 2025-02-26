import { Router } from "express";
import { body } from "express-validator";
import reportController from "../controller/report.controller";

const router: Router = Router();

const reportValidator = [
  body("time").notEmpty().withMessage("Report time is required!"),
];

router.post("/", reportValidator, reportController.createReport);

router.get("/:report_id", [], reportController.getReport);

router.delete("/:report_id", [], reportController.deleteReport);

export default router;
