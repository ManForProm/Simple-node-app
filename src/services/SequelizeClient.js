import { Sequelize } from "sequelize";
import config from "../config/config.json" assert { type: "json" };

const env = process.env.NODE_ENV || "development";
const { database, username, password, host, dialect } = config[env];

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: env.DB_LOG ? console.log : false,
});

export default sequelize;
