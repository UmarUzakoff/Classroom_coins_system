import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../models/User";
import { CustomError } from "../types/custom-error";
import { verify } from "../utils/jwt";

interface IUserRequest extends Request {
  verifiedUser: any;
}

const tokenMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];

    if (!token) throw new CustomError("Invalid tokenn!", 401);

    const findUser = verify(token);

    const verifiedUser = await User.findOne({
      where: { email: findUser.email },
    });
    if (!verifiedUser) throw new CustomError("Invalid token!", 401);
    (req as IUserRequest).verifiedUser = verifiedUser.dataValues;
    next();
  } catch (error) {
    next(error);
  }
};

export default tokenMiddleware;
