import { Router } from "express";
import reportRouter from "./report";

const router: Router = Router();

router.use("/", (req, res) => {
  res.send("Welcome to the Emobi");
});

router.use("/reports", [], reportRouter);

export default router;
