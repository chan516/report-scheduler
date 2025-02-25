import express, { Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import db from './models';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
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