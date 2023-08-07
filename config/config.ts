import "dotenv/config";
import { Secret } from "jsonwebtoken";

interface IConfig {
  PORT: string | number;
  DB_PASSWORD: string;
  SECRET_KEY: Secret;
  PAYMENT_API_KEY: string;
}

const config = {
  PORT: process.env.PORT || 3000,
  DB_PASSWORD: process.env.DB_PASSWORD,
  SECRET_KEY: process.env.SECRET_KEY,
} as IConfig;

export default config;
