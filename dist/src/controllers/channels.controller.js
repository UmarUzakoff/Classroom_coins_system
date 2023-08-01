"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetExactChannel = exports.ChannelsGet = void 0;
const Channel_1 = __importDefault(require("../models/Channel"));
//--------GETTING ALL CHANNELS--------------------------------
const ChannelsGet = async (req, res, next) => {
    try {
        const channels = await Channel_1.default.findAll();
        res.status(200).json(channels);
    }
    catch (error) {
        next(error);
    }
};
exports.ChannelsGet = ChannelsGet;
const GetExactChannel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const channel = await Channel_1.default.findOne({ where: { id } });
        res.status(200).json(channel);
    }
    catch (error) {
        next(error);
    }
};
exports.GetExactChannel = GetExactChannel;
