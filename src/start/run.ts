import { Application } from "express";
import config from "../../config/config";
import { sequelize } from "../../config/db/connections";
import User from "../models/User";

const run = async (app: Application) => {
  await sequelize.authenticate({
    logging: false,
  });
  await sequelize.sync({
    alter: true,
    logging: false,
  });

  const admin = await User.findOne({
    where: { email: "umar.uzakoff@mail.ru" },
  });

  if (!admin) {
    await User.create({
      name: "MuhammadUmar",
      surname: "Uzoqov",
      password: "$2b$12$oaOaQb4hy2PRocVtMIYdwuY6CCppnkwb3PHTEGlSbFdPDV2wX3k6m",
      email: "umar.uzakoff@mail.ru",
      classroom_id: 0,
      role: "admin",
    });
  }

  app.all("/*", async (req, res) => {
    res.status(404).json({error: 'Route Not Found'});
  });

  app.listen(config.PORT, () => {
    console.log(`Server listening on ${config.PORT}`);
  });
};

export default run;
