import express, { Application } from 'express';
import dotenv from 'dotenv';
import db from './models';
import mainRouter from './routes'
import reportJob from './jobs';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use('/api', mainRouter);

app.use(reportJob)

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