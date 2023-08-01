"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = exports.verify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const SECRET_KEY = config_1.default.SECRET_KEY;
const verify = (payload) => jsonwebtoken_1.default.verify(payload, SECRET_KEY);
exports.verify = verify;
const sign = (payload) => jsonwebtoken_1.default.sign(payload, SECRET_KEY);
exports.sign = sign;
