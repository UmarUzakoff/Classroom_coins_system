import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { sign } from "../utils/jwt";
import { ILogin } from "../types/user.types";
import { CustomError } from "../types/custom-error";
import { LoginSchema } from "../validations/user.validate";

//--------LOGIN--------------------------------

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as ILogin;

    //VALIDATION
    const { error } = LoginSchema({ email, password });
    if (error) throw new CustomError(error.message, 400);

    //Finding a user and Comparing Hash Values
    const findUser: any = await User.findOne({ where: { email } });

    if (!findUser)
      throw new CustomError("Incorrect email or password!", 403);

    const comparePassword = await bcrypt.compare(
      password,
      findUser.dataValues.password
    );

    if (!comparePassword)
      throw new CustomError("Incorrect email or password!", 403);

    //TOKEN
    const token = sign({ email: findUser.dataValues.email });
    res.status(200).json({ message: "Successfully logged in!", token });
  } catch (error) {
    next(error);
  }
};
