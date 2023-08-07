"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config/config"));
const connections_1 = require("../../config/db/connections");
const User_1 = __importDefault(require("../models/User"));
const run = async (app) => {
    await connections_1.sequelize.authenticate({
        logging: false,
    });
    await connections_1.sequelize.sync({
        alter: true,
        logging: false,
    });
    const admin = await User_1.default.findOne({
        where: { email: "umar.uzakoff@mail.ru" },
    });
    if (!admin) {
        await User_1.default.create({
            name: "MuhammadUmar",
            surname: "Uzoqov",
            password: "$2b$12$oaOaQb4hy2PRocVtMIYdwuY6CCppnkwb3PHTEGlSbFdPDV2wX3k6m",
            email: "umar.uzakoff@mail.ru",
            classroom_id: 0,
            role: "admin",
        });
    }
    app.all("/*", async (req, res) => {
        res.status(404).json({ error: 'Route Not Found' });
    });
    app.listen(config_1.default.PORT, () => {
        console.log(`Server listening on ${config_1.default.PORT}`);
    });
};
exports.default = run;
