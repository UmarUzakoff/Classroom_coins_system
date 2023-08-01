"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudPut = exports.CrudDelete = exports.CrudPost = exports.CrudGet = void 0;
const User_1 = __importDefault(require("../models/User"));
// import Channel from "../models/Channel";
const joi_1 = __importDefault(require("joi"));
const CrudGet = async (req, res) => {
    try {
        const users = await User_1.default.findAll();
        // const channels = await Channel.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.CrudGet = CrudGet;
const CrudPost = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //VALIDATION
        const schema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            name: joi_1.default.string().required(),
            password: joi_1.default.string().required(),
        });
        const { error } = schema.validate({ email, name, password });
        if (error) {
            return res.status(403).json({ error: error.message });
        }
        await User_1.default.create({ name, email, password });
        res.status(201).json({ message: "Successfully created" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.CrudPost = CrudPost;
const CrudDelete = async (req, res) => {
    try {
        const { id } = req.params;
        //VALIDATION
        const schema = joi_1.default.object({
            id: joi_1.default.number().required(),
        });
        const { error } = schema.validate({ id });
        if (error) {
            return res.status(403).json({ error: error.message });
        }
        await User_1.default.destroy({
            where: {
                id: id,
            },
        });
        res.status(200).json({ message: "Successfully deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.CrudDelete = CrudDelete;
const CrudPut = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        //VALIDATION
        const schema = joi_1.default.object({
            email: joi_1.default.string().email(),
            name: joi_1.default.string(),
            password: joi_1.default.string(),
        });
        const { error } = schema.validate({ email, name, password });
        if (error) {
            return res.status(403).json({ error: error.message });
        }
        await User_1.default.update({ name, email, password }, {
            where: {
                id: id,
            },
        });
        res.status(200).json({ message: "Successfully editedd" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.CrudPut = CrudPut;
