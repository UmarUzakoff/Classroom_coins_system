import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import Joi from "joi";
import User from "../models/User";
import { sign } from "../utils/jwt";
import { IUser } from "../types/types";
import { CustomError } from "../types/custom-error";
import { Op } from "sequelize";

//--------LOGIN--------------------------------

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password } = req.body as IUser;

    //VALIDATION
    const schema = Joi.object({
      name: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate({ name, password });
    if (error) {
      return res.status(403).json({ error: error.message });
    }

    //Finding a username and Comparing Hash Values
    const findUser: any = await User.findOne({ where: { name } });

    if (!findUser)
      throw new CustomError("Incorrect username or password!", 403);

    const comparePassword = await bcrypt.compare(
      password,
      findUser.dataValues.password
    );

    if (!comparePassword)
      throw new CustomError("Incorrect username or password!", 403);

    //TOKEN
    const token = sign({ email: findUser.dataValues.email });
    // res.cookie("token", token, { maxAge: 3000000000, secure: true });
    res.status(200).json({ message: "Successfully logged in!", token });
  } catch (error) {
    next(error);
  }
};

//--------REGISTER--------------------------------

export const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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

    //Finding a username and Hashing password
    const findUser = await User.findOne({
      where: { [Op.or]: [{ name }, { email }] },
    });
    if (findUser) throw new CustomError("User already exist!", 403);
    const hashedPassword = await bcrypt.hash(password, 12);

    //NEWUSER
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //TOKEN
    const token = sign({ email: newUser.dataValues.email });
    // res.cookie("token", token, { maxAge: 3000000000, secure: true });
    res.status(201).json({ message: "Successfully signed up!", token });
  } catch (error) {
    next(error);
  }
};
