"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../utils/jwt");
const custom_error_1 = require("../types/custom-error");
const user_validate_1 = require("../validations/user.validate");
//--------LOGIN--------------------------------
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //VALIDATION
        const { error } = (0, user_validate_1.LoginSchema)({ email, password });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        //Finding a user and Comparing Hash Values
        const findUser = await User_1.default.findOne({ where: { email } });
        if (!findUser)
            throw new custom_error_1.CustomError("Incorrect email or password!", 403);
        const comparePassword = await bcrypt_1.default.compare(password, findUser.dataValues.password);
        if (!comparePassword)
            throw new custom_error_1.CustomError("Incorrect email or password!", 403);
        //TOKEN
        const token = (0, jwt_1.sign)({ email: findUser.dataValues.email });
        res.status(200).json({ message: "Successfully logged in!", token });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
