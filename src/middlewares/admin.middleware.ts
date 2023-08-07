import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomError } from "../types/custom-error";
import { verify } from "../utils/jwt";

const isAdmin: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];

    if (!token) throw new CustomError("Invalid token!", 401);

    const findUser = verify(token);

    if (findUser.email !== "umar.uzakoff@mail.ru")
      throw new CustomError(
        "This route is only accessible by administrator!",
        403
      );
    next();
  } catch (error) {
    next(error);
  }
};

export default isAdmin;
