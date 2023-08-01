"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const Channel_1 = __importDefault(require("../models/Channel"));
const UserChannel_1 = __importDefault(require("../models/relations/UserChannel"));
const nodeCron = async () => {
    await UserChannel_1.default.findAll().then((userChannels) => {
        userChannels.forEach(async (userChannel) => {
            ///---///
            const startDate = userChannel.dataValues.start_date;
            const endDate = userChannel.dataValues.end_date;
            var diffInDays = (0, moment_1.default)(endDate).diff(startDate, "days");
            const channel = await Channel_1.default.findOne({
                where: { id: userChannel.dataValues.channelId },
            });
            const subscriptionDuration = channel?.dataValues.duration;
            if (diffInDays > subscriptionDuration) {
                UserChannel_1.default.destroy({
                    where: {
                        userId: userChannel.dataValues.userId,
                        channelId: userChannel.dataValues.channelId,
                    },
                })
                    .then(async () => {
                    const user = await UserChannel_1.default.findOne({
                        where: { id: userChannel.dataValues.userId },
                    });
                    const emailOfUser = user?.dataValues.email;
                    const transporter = nodemailer_1.default.createTransport({
                        port: 465,
                        host: "smtp.gmail.com",
                        auth: {
                            user: "eankundagacxen@gmail.com",
                            pass: "pilsarfzqsxqjgnp",
                        },
                        secure: true,
                    });
                    const mailData = {
                        from: "umar.uzakoff@mail.ru",
                        to: emailOfUser,
                        subject: "Sending Email using Node.js",
                        text: "That was easy!",
                        html: `<b>You were removed from ${channel?.dataValues.name} channel due to non-payment</b>`,
                    };
                    const data = await transporter.sendMail(mailData);
                    console.log(data);
                    console.log(`User ${userChannel.dataValues.userId} removed from channel ${userChannel.dataValues.channelId} due to non-payment`);
                })
                    .catch((error) => {
                    console.log("Error removing user from channel: ", error);
                });
            }
        });
    });
};
exports.default = nodeCron;
