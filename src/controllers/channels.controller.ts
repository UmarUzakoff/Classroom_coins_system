import { NextFunction, Request, RequestHandler, Response } from "express";
import Channel from "../models/Channel";

//--------GETTING ALL CHANNELS--------------------------------

export const ChannelsGet: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const channels = await Channel.findAll();
    res.status(200).json(channels);
  } catch (error) {
    next(error);
  }
};

export const GetExactChannel: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params;
    const channel = await Channel.findOne({where: {id}});
    res.status(200).json(channel);
  } catch (error) {
    next(error);
  }
};