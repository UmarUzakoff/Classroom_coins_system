"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../utils/jwt");
const custom_error_1 = require("../types/custom-error");
const sequelize_1 = require("sequelize");
//--------LOGIN--------------------------------
const login = async (req, res, next) => {
    try {
        const { name, password } = req.body;
        //VALIDATION
        const schema = joi_1.default.object({
            name: joi_1.default.string().required(),
            password: joi_1.default.string().required(),
        });
        const { error } = schema.validate({ name, password });
        if (error) {
            return res.status(403).json({ error: error.message });
        }
        //Finding a username and Comparing Hash Values
        const findUser = await User_1.default.findOne({ where: { name } });
        if (!findUser)
            throw new custom_error_1.CustomError("Incorrect username or password!", 403);
        const comparePassword = await bcrypt_1.default.compare(password, findUser.dataValues.password);
        if (!comparePassword)
            throw new custom_error_1.CustomError("Incorrect username or password!", 403);
        //TOKEN
        const token = (0, jwt_1.sign)({ email: findUser.dataValues.email });
        // res.cookie("token", token, { maxAge: 3000000000, secure: true });
        res.status(200).json({ message: "Successfully logged in!", token });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
//--------REGISTER--------------------------------
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        //VALIDATION
        const schema = joi_1.default.object({
            name: joi_1.default.string().required(),
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().required(),
        });
        const { error } = schema.validate({ name, email, password });
        if (error) {
            return res.status(403).json({ error: error.message });
        }
        //Finding a username and Hashing password
        const findUser = await User_1.default.findOne({
            where: { [sequelize_1.Op.or]: [{ name }, { email }] },
        });
        if (findUser)
            throw new custom_error_1.CustomError("User already exist!", 403);
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        //NEWUSER
        const newUser = await User_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        //TOKEN
        const token = (0, jwt_1.sign)({ email: newUser.dataValues.email });
        // res.cookie("token", token, { maxAge: 3000000000, secure: true });
        res.status(201).json({ message: "Successfully signed up!", token });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
