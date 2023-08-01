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
    if (!token) {
      return res.status(401).json({ message: "Invalid token!" });
    }
    const findUser = verify(token);
    if (findUser.email !== "ab@gmail.com")
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
