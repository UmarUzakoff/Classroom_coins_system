"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.minusCoins = exports.plusCoins = void 0;
const Classroom_1 = __importDefault(require("../models/Classroom"));
const User_1 = __importDefault(require("../models/User"));
const custom_error_1 = require("../types/custom-error");
//--------PLUS COINS--------------------------------
const plusCoins = async (req, res, next) => {
    try {
        const { id } = req.params;
        const coins = req.body.coins;
        if (!id)
            throw new custom_error_1.CustomError("Invalid id provided", 403);
        if (!coins)
            throw new custom_error_1.CustomError("Coins are required!", 403);
        const findStudent = await User_1.default.findOne({ where: { id } });
        if (!findStudent)
            throw new custom_error_1.CustomError("No student found!", 403);
        const findClass = await Classroom_1.default.findOne({
            where: { id: findStudent.dataValues.classroom_id },
        });
        if (findClass?.dataValues.coins < coins)
            throw new custom_error_1.CustomError("Coins are not enough!", 403);
        await Classroom_1.default.update({ coins: findClass?.dataValues.coins - coins }, {
            where: {
                id: findClass?.dataValues.id,
            },
        });
        await User_1.default.update({ coins: findStudent.dataValues.coins + coins }, {
            where: {
                id,
            },
        });
        res.status(201).json({ message: "Successfully graded" });
    }
    catch (error) {
        next(error);
    }
};
exports.plusCoins = plusCoins;
//--------MINUS COINS--------------------------------
const minusCoins = async (req, res, next) => {
    try {
        const { id } = req.params;
        const coins = req.body.coins;
        if (!id)
            throw new custom_error_1.CustomError("Invalid id provided", 403);
        if (!coins)
            throw new custom_error_1.CustomError("Coins are required!", 403);
        const findStudent = await User_1.default.findOne({ where: { id } });
        if (!findStudent)
            throw new custom_error_1.CustomError("No student found!", 403);
        const findClass = await Classroom_1.default.findOne({
            where: { id: findStudent.dataValues.classroom_id },
        });
        await Classroom_1.default.update({ coins: findClass?.dataValues.coins + coins }, {
            where: {
                id: findClass?.dataValues.id,
            },
        });
        await User_1.default.update({ coins: findStudent.dataValues.coins - coins }, {
            where: {
                id,
            },
        });
        res.status(201).json({ message: "Successfully graded" });
    }
    catch (error) {
        next(error);
    }
};
exports.minusCoins = minusCoins;
