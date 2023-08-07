import express, { Application } from "express";
import cors from "cors";
import router from "../routes";
import { errorHandler } from "../middlewares/error-handler";

const modules = async (app: Application) => {
  app.use(express.json());
  app.use(cors());
  app.use(router);
  app.use(errorHandler);
};

export default modules;
