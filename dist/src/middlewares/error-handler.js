"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = async (error, req, res, next) => {
    res
        .status(error.code || 500)
        .json({ message: error.message || "Internal Server Error" });
};
exports.errorHandler = errorHandler;
