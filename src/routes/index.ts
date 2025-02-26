import { Router } from "express";
import reportRouter from "./report";

const router: Router = Router();

router.use("/reports", [], reportRouter);

export default router;
