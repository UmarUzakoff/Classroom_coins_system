"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUser = exports.usersubscriptions = exports.Subscription = void 0;
const joi_1 = __importDefault(require("joi"));
const Channel_1 = __importDefault(require("../models/Channel"));
const UserChannel_1 = __importDefault(require("../models/relations/UserChannel"));
const User_1 = __importDefault(require("../models/User"));
const custom_error_1 = require("../types/custom-error");
//--------SUBSCRIBING PROCESS--------------------------------
const Subscription = async (req, res, next) => {
    try {
        const { id } = req.params; // Channel ID
        const verifiedUser = req.verifiedUser;
        const channel = await Channel_1.default.findOne({ where: { id } });
        console.log(channel);
        //CHECKING IF USER ALREADY SUBCRIBED
        const findSubscription = await UserChannel_1.default.findOne({
            where: { userId: verifiedUser.id, channelId: id },
        });
        if (findSubscription?.dataValues.verified)
            throw new custom_error_1.CustomError(`You're already subscribed to the ${channel?.dataValues.name} channel!`, 403);
        //CHECKING IF USER HAS ENOUGH MONEY
        const price = verifiedUser.money - channel?.dataValues.subscription_price;
        if (price < 0)
            throw new custom_error_1.CustomError(`Unfortunately you don't have enough money to subscribe to the ${channel?.dataValues.name} channel!`, 403);
        await User_1.default.update({ money: price }, {
            where: {
                id: verifiedUser.id,
            },
        });
        var now = new Date();
        var endDate = now.setDate(now.getDate() + channel?.dataValues.duration);
        UserChannel_1.default.create({
            userId: verifiedUser.id,
            channelId: channel?.dataValues.id,
            verified: true,
            end_date: endDate,
            UserId: verifiedUser.id,
            ChannelId: channel?.dataValues.id,
        });
        res.status(201).json({
            message: `You're successfully subscribed to ${channel?.dataValues.name} channel!`,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.Subscription = Subscription;
//--------USER CAN SEE TO WHICH CHANNELS HE IS SUBSCRIBED--------------------------------
const usersubscriptions = async (req, res, next) => {
    try {
        const verifiedUser = req.verifiedUser;
        const subs = await User_1.default.findOne({
            where: { id: verifiedUser.id },
            include: {
                model: Channel_1.default,
                attributes: ["name"],
            },
        });
        res.status(200).json(subs);
    }
    catch (error) {
        next(error);
    }
};
exports.usersubscriptions = usersubscriptions;
//--------USER CAN EDIT HIS ACCOUNT PROPERTIES--------------------------------
const EditUser = async (req, res, next) => {
    try {
        const verifiedUser = req.verifiedUser;
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
        await User_1.default.update({ name: name, email: email, password: password }, {
            where: {
                id: verifiedUser.id,
            },
        });
        res.status(200).json({ message: "Your account successfully edited" });
    }
    catch (error) {
        next(error);
    }
};
exports.EditUser = EditUser;
