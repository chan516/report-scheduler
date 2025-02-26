import pg from 'pg';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { config } from 'dotenv';
import Report from './report.model';

config();

const db = new Sequelize({
  database: process.env.POSTGRESQL_DATABASE || 'postgres',
  username: process.env.POSTGRESQL_USER || 'postgres',
  password: process.env.POSTGRESQL_PASSWORD || 'postgres',
  host: process.env.POSTGRESQL_HOST || 'localhost',
  dialect: 'postgres',
  port: parseInt(process.env.POSTGRESQL_PORT || '', 10) || 5432,
  define: {
    timestamps: true,
    paranoid: true
  },
  dialectModule: pg,
  logging: false
} as SequelizeOptions);

db.addModels([
  Report
])

export default db;