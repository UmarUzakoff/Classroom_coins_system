import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config/config";

const SECRET_KEY: Secret = config.SECRET_KEY;

export const verify = (payload: any | JwtPayload) =>
  jwt.verify(payload, SECRET_KEY) as JwtPayload;
export const sign = (payload: JwtPayload) => jwt.sign(payload, SECRET_KEY);
