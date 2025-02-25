import { Router } from "express";
import reportController from "../controller/report.controller";

const router: Router = Router();

router.post("/", reportController.createReport);

router.get("/:report_id", reportController.getReport);

router.delete("/:report_id", reportController.deleteReport);

export default router;