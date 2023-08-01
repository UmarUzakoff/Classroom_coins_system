import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";
import Channel from "../models/Channel";
import UserChannel from "../models/relations/UserChannel";
import User from "../models/User";
import { IChannel } from "../types/types";

//--------GETTING ALL USERS--------------------------------

export const GetAllUsers: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//--------GETTING JOINED TABLE--------------------------------

export const UsersChannelsGet: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const usersChannels = await UserChannel.findAll();
    res.status(200).json(usersChannels);
  } catch (error) {
    next(error);
  }
};

//--------CREATING A NEW CHANNEL--------------------------------

export const ChannelPost: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, subscription_price, duration } = req.body as IChannel;

    //VALIDATION
    const schema = Joi.object({
      name: Joi.string().required(),
      subscription_price: Joi.number().required(),
      duration: Joi.number().required(),
    });

    const { error } = schema.validate({ name, subscription_price, duration });
    if (error) {
      return res.status(403).json({ error: error.message });
    }

    //CREATING A NEW CHANNEL
    await Channel.create({ name, subscription_price, duration });
    res.status(201).json({ message: "Successfully created" });
  } catch (error) {
    next(error);
  }
};

//--------GETTING CHANNEL SUBSCRIBERS--------------------------------

export const channelsubscribers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params; // Channel ID
    const subs = await Channel.findOne({
      where: { id },
      include: {
        model: User,
        attributes: ["id", "name"],
      },
    });
    res.status(200).json(subs);
  } catch (error) {
    next(error);
  }
};

//--------ADMIN CAN DELETE USERS--------------------------------

export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: { id },
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
