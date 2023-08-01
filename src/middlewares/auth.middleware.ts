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
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Invalid token!" });
    }
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
