import { Application } from "express";
import cron from "node-cron";
import config from "../../config/config";
import { sequelize } from "../../config/db/connections";
import User from "../models/User";
import nodeCron from "../node-cron/cron";

const run = async (app: Application) => {
  await sequelize.authenticate({
    logging: false,
  });
  await sequelize.sync({
    alter: true,
    logging: false,
  });

  const admin = await User.findOne({
    where: { name: "admin", email: "ab@gmail.com" },
  });

  if (!admin) {
    await User.create({
      name: "admin",
      password: "$2b$12$oaOaQb4hy2PRocVtMIYdwuY6CCppnkwb3PHTEGlSbFdPDV2wX3k6m",
      email: "ab@gmail.com",
      is_admin: true,
    });
  }

  //   cron.schedule("* * * * * *", nodeCron); //This code schedules a task that runs daily at midnight

  app.all("/*", async (req, res) => {
    res.status(404).json({error: 'Route Not Found'});
  });

  app.listen(config.PORT, () => {
    console.log(`Server listening on ${config.PORT}`);
  });
};

export default run;
