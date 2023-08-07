"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPasswordSchema = exports.EditEmailSchema = exports.CreateStudentSchema = exports.LoginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const LoginSchema = (payload) => {
    return joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
    }).validate(payload);
};
exports.LoginSchema = LoginSchema;
const CreateStudentSchema = (payload) => {
    return joi_1.default.object({
        name: joi_1.default.string().required(),
        surname: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        classroom_id: joi_1.default.number().required(),
    }).validate(payload);
};
exports.CreateStudentSchema = CreateStudentSchema;
const EditEmailSchema = (payload) => {
    return joi_1.default.object({
        newEmail: joi_1.default.string().email(),
        previousEmail: joi_1.default.string().email(),
    }).validate(payload);
};
exports.EditEmailSchema = EditEmailSchema;
const EditPasswordSchema = (payload) => {
    return joi_1.default.object({
        newPassword: joi_1.default.string(),
        previousPassword: joi_1.default.string(),
    }).validate(payload);
};
exports.EditPasswordSchema = EditPasswordSchema;
