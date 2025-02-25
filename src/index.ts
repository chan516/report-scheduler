import express, { Application } from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { Op } from 'sequelize';
import db from './models';
import Report from './models/report.model'
import mainRouter from './routes'
import reportQueue from './utils/queue';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use('/api', mainRouter);

cron.schedule('* * * * *', async () => {
  const reports = await Report.findAll({ where: { scheduledAt: { [Op.ne]: null }, status: 'Pending' } });
  for (const report of reports) {
    if (new Date(report.time) <= new Date()) {
      await reportQueue.add('generateReport', { reportId: report.report_id });
    }
  }
});

db.authenticate()
  .then(async () => {
    console.log(
      'Connection to the database has been established successfully.'
    );
    app.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });