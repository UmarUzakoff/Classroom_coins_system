import moment from "moment";
import nodemailer from "nodemailer";
import Channel from "../models/Channel";
import UserChannel from "../models/relations/UserChannel";

const nodeCron = async () => {
  await UserChannel.findAll().then((userChannels) => {
    userChannels.forEach(async (userChannel) => {
      ///---///
      const startDate = userChannel.dataValues.start_date;

      const endDate = userChannel.dataValues.end_date;

      var diffInDays = moment(endDate).diff(startDate, "days");

      const channel = await Channel.findOne({
        where: { id: userChannel.dataValues.channelId },
      });

      const subscriptionDuration = channel?.dataValues.duration;

      if (diffInDays > subscriptionDuration) {
        UserChannel.destroy({
          where: {
            userId: userChannel.dataValues.userId,
            channelId: userChannel.dataValues.channelId,
          },
        })
          .then(async () => {
            const user = await UserChannel.findOne({
              where: { id: userChannel.dataValues.userId },
            });
            const emailOfUser = user?.dataValues.email;
            const transporter = nodemailer.createTransport({
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
            console.log(
              `User ${userChannel.dataValues.userId} removed from channel ${userChannel.dataValues.channelId} due to non-payment`
            );
          })
          .catch((error) => {
            console.log("Error removing user from channel: ", error);
          });
      }
    });
  });
};

export default nodeCron;
