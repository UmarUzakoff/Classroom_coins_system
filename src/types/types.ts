import { Secret } from "jsonwebtoken";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IChannel {
  name: string;
  subscription_price: number;
  duration: number;
}

export interface IConfig {
  PORT: string | number;
  DB_PASSWORD: string;
  SECRET_KEY: Secret;
  PAYMENT_API_KEY: string
}
