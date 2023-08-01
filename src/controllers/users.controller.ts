import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";
import Channel from "../models/Channel";
import UserChannel from "../models/relations/UserChannel";
import User from "../models/User";
import { CustomError } from "../types/custom-error";
import { IUser } from "../types/types";

interface IUserRequest extends Request {
  verifiedUser: any;
}

//--------SUBSCRIBING PROCESS--------------------------------

export const Subscription: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params; // Channel ID
    const verifiedUser = (req as IUserRequest).verifiedUser;
    const channel = await Channel.findOne({ where: { id } });

    console.log(channel);

    //CHECKING IF USER ALREADY SUBCRIBED
    const findSubscription = await UserChannel.findOne({
      where: { userId: verifiedUser.id, channelId: id },
    });

    if (findSubscription?.dataValues.verified)
      throw new CustomError(
        `You're already subscribed to the ${channel?.dataValues.name} channel!`,
        403
      );

    //CHECKING IF USER HAS ENOUGH MONEY
    const price = verifiedUser.money - channel?.dataValues.subscription_price;

    if (price < 0)
      throw new CustomError(
        `Unfortunately you don't have enough money to subscribe to the ${channel?.dataValues.name} channel!`,
        403
      );

    await User.update(
      { money: price },
      {
        where: {
          id: verifiedUser.id,
        },
      }
    );

    var now = new Date();

    var endDate = now.setDate(now.getDate() + channel?.dataValues.duration);

    UserChannel.create({
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
  } catch (error) {
    next(error);
  }
};

//--------USER CAN SEE TO WHICH CHANNELS HE IS SUBSCRIBED--------------------------------

export const usersubscriptions: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const verifiedUser = (req as IUserRequest).verifiedUser;
    const subs = await User.findOne({
      where: { id: verifiedUser.id },
      include: {
        model: Channel,
        attributes: ["name"],
      },
    });
    res.status(200).json(subs);
  } catch (error) {
    next(error);
  }
};

//--------USER CAN EDIT HIS ACCOUNT PROPERTIES--------------------------------

export const EditUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const verifiedUser = (req as IUserRequest).verifiedUser;
    const { name, email, password } = req.body as IUser;

    //VALIDATION
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate({ name, email, password });
    if (error) {
      return res.status(403).json({ error: error.message });
    }

    await User.update(
      { name: name, email: email, password: password },
      {
        where: {
          id: verifiedUser.id,
        },
      }
    );
    res.status(200).json({ message: "Your account successfully edited" });
  } catch (error: any) {
    next(error);
  }
};
