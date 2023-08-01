"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.channelsubscribers = exports.ChannelPost = exports.UsersChannelsGet = exports.GetAllUsers = void 0;
const joi_1 = __importDefault(require("joi"));
const Channel_1 = __importDefault(require("../models/Channel"));
const UserChannel_1 = __importDefault(require("../models/relations/UserChannel"));
const User_1 = __importDefault(require("../models/User"));
//--------GETTING ALL USERS--------------------------------
const GetAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.GetAllUsers = GetAllUsers;
//--------GETTING JOINED TABLE--------------------------------
const UsersChannelsGet = async (req, res, next) => {
    try {
        const usersChannels = await UserChannel_1.default.findAll();
        res.status(200).json(usersChannels);
    }
    catch (error) {
        next(error);
    }
};
exports.UsersChannelsGet = UsersChannelsGet;
//--------CREATING A NEW CHANNEL--------------------------------
const ChannelPost = async (req, res, next) => {
    try {
        const { name, subscription_price, duration } = req.body;
        //VALIDATION
        const schema = joi_1.default.object({
            name: joi_1.default.string().required(),
            subscription_price: joi_1.default.number().required(),
            duration: joi_1.default.number().required(),
        });
        const { error } = schema.validate({ name, subscription_price, duration });
        if (error) {
            return res.status(403).json({ error: error.message });
        }
        //CREATING A NEW CHANNEL
        await Channel_1.default.create({ name, subscription_price, duration });
        res.status(201).json({ message: "Successfully created" });
    }
    catch (error) {
        next(error);
    }
};
exports.ChannelPost = ChannelPost;
//--------GETTING CHANNEL SUBSCRIBERS--------------------------------
const channelsubscribers = async (req, res, next) => {
    try {
        const { id } = req.params; // Channel ID
        const subs = await Channel_1.default.findOne({
            where: { id },
            include: {
                model: User_1.default,
                attributes: ["id", "name"],
            },
        });
        res.status(200).json(subs);
    }
    catch (error) {
        next(error);
    }
};
exports.channelsubscribers = channelsubscribers;
//--------ADMIN CAN DELETE USERS--------------------------------
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await User_1.default.destroy({
            where: { id },
        });
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
