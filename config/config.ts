import "dotenv/config";
import { IConfig } from "../src/types/types";

const config = {
    PORT: process.env.PORT || 3000,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SECRET_KEY: process.env.SECRET_KEY,
    PAYMENT_API_KEY: process.env.PAYMENT_API_KEY
} as IConfig;

export default config;