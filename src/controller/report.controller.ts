import { Request, Response } from "express";
import Report from "../models/report.model";
import addToQueue from "../utils/queue";


const createReport = async (req: Request, res: Response) => {
  try {
    const { schedule } = req.body;
    const report = await Report.create({ time: schedule, status: "Active" });
    if (!schedule) {
      await addToQueue({ report_id: report.report_id, time: schedule });
    }
    res.status(201).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });    
  }
};

const getReport = async (req: Request, res: Response) => {
  try {
    const { report_id } = req.params;
    const report = await Report.findOne({
      where: { report_id }
    });
    if (!report) res.status(404).json({ error: "Report not found" });
    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });    
  }
}

const deleteReport = async (req: Request, res: Response) => {
  try {
    const { report_id } = req.params;
    const report = await Report.findOne({
      where: { report_id }
    });
    if (!report || report.status !== "Pending") res.status(404).json({ error: "Cannot cancel" });
    if (report) await report.destroy();
    res.status(204).json({ message: "Report cancelled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });    
  }
}

const reportController = {
  createReport,
  getReport,
  deleteReport
};

export default reportController;
