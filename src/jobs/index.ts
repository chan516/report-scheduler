import schedule from "node-schedule";
import { Op } from "sequelize";
import Report from "../models/report.model";
import addToQueue from "../utils/queue";
import { getScheduleDate } from "../utils/common";

const reportJob = async () => {
  const reports = await Report.findAll({
    where: { time: { [Op.ne]: null }, status: { [Op.ne]: "Pending" } },
  });
  if (!reports.length) {
    console.log("No active reports to schedule.");
    return;
  }

  reports.forEach(({ report_id, time }) => {
    const scheduleDate = getScheduleDate(time);
    schedule.scheduleJob(scheduleDate, async () => {
      try {
        await addToQueue({ report_id, time });
        await Report.update({ status: "Pending" }, { where: { report_id } });
        console.log("Report job is scheduled successfully", report_id);
      } catch (error) {
        console.error("Failed to process report job", report_id, error);
      }
    });
  });
};

export default reportJob;
