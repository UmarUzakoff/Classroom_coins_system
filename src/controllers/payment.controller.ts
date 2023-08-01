import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";
import User from "../models/User";
import stripe from "stripe";
import config from "../../config/config";

const stripeService = new stripe(
  config.PAYMENT_API_KEY,
  { apiVersion: "2022-11-15" }
);

interface IUserRequest extends Request {
  verifiedUser: any;
}

//--------ADDING MONEY TO THE BANK ACCOUNT--------------------------------

export const AddMoney: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const verifiedUser = (req as IUserRequest).verifiedUser;
    let { amount, id, user_id } = req.body;
    console.log(amount, id, user_id);
    
    const verifiedUser = await User.findOne({where: {id: user_id}});

    const payment = await stripeService.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Payment",
      payment_method: id,
      confirm: true,
    });

    console.log(payment);

    //VALIDATION
    const schema = Joi.object({
      amount: Joi.number().required(),
      user_id: Joi.number().required(),
    });

    const { error } = schema.validate({ amount, user_id });
    if (error) {
      return res.status(403).json({ error: error.message });
    }

    await User.update(
      { money: verifiedUser?.dataValues.money + amount },
      {
        where: {
          id: verifiedUser?.dataValues.id,
        },
      }
    );
    res
      .status(200)
      .json({ message: `$${amount} are successfully added to your account` });
  } catch (error: any) {
    next(error);
  }
};
