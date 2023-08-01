"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_1 = require("../types/custom-error");
const jwt_1 = require("../utils/jwt");
const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers["authorization"] &&
            req.headers["authorization"].split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Invalid token!" });
        }
        const findUser = (0, jwt_1.verify)(token);
        if (findUser.email !== "ab@gmail.com")
            throw new custom_error_1.CustomError("This route is only accessible by administrator!", 403);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = isAdmin;
