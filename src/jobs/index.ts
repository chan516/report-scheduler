import cron from 'node-cron';
import { Op } from 'sequelize';
import Report from '../models/report.model'
import addToQueue from '../utils/queue';

const reportJob = async () => {
  cron.schedule('* * * * *', async () => {
    const reports = await Report.findAll({ where: { scheduledAt: { [Op.ne]: null }, status: 'Pending' } });
    for (const report of reports) {
      if (new Date(report.time) <= new Date()) {
        await addToQueue({ report_id: report.report_id, time: report.time })
      }
    }
    console.log('Report job created successfully');
  });
}

export default reportJob;