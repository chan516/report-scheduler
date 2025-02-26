import schedule from "node-schedule";
import { Op } from "sequelize";
import Report from "../models/report.model";
import addToQueue from "../utils/queue";
import { checkScheduledTime } from "../utils/common";

const reportJob = async () => {
  const reports = await Report.findAll({
    where: { time: { [Op.ne]: null }, status: "Active" },
  });
  if (reports) {
    reports.map(({ report_id, time }) => {
      if (checkScheduledTime(time)) {
        return schedule.scheduleJob("* * * * *", async () => {
          await addToQueue({ report_id, time });
          await Report.update({ status: "Pending" }, { where: { report_id } });
          console.log("Report job is scheduled successfully", report_id);
        });
      }
    });
  }
};

export default reportJob;
