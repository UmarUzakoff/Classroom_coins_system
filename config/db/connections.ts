import { Sequelize } from "sequelize";
import config from "../config";

export const sequelize = new Sequelize(
  `postgres://postgres:${config.DB_PASSWORD}@localhost:5432/classroom`
);
