import express, { Application } from "express";
import modules from "./start/modules";
import run from "./start/run";

const app: Application = express();

modules(app);
run(app);