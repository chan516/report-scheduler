import schedule from 'node-schedule';
import { Op } from 'sequelize';
import Report from '../models/report.model'
import addToQueue from '../utils/queue';
import { getTime } from '../utils/common';

const reportJob = async () => {
  const reports = await Report.findAll({ where: { time: { [Op.ne]: null }, status: 'Active' } });
  if (reports) {
    reports.map(({report_id, time}) => {
      return schedule.scheduleJob('* * * * *', async () => {
        if (getTime(new Date(time)) <= getTime(new Date())) {
          await addToQueue({ report_id, time })
          console.log('Report job is scheduled successfully', report_id);
        } else {
          console.log('Report job is not exist');
        }
      });
    })
  }
}

export default reportJob;