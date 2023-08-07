import { NextFunction, Request, RequestHandler, Response } from "express";
import Classroom from "../models/Classroom";
import User from "../models/User";
import { CustomError } from "../types/custom-error";

//--------PLUS COINS--------------------------------

export const plusCoins: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const coins: number = req.body.coins;

    if (!id) throw new CustomError("Invalid id provided", 403);
    if (!coins) throw new CustomError("Coins are required!", 403);

    const findStudent = await User.findOne({ where: { id } });

    if (!findStudent) throw new CustomError("No student found!", 403);

    const findClass = await Classroom.findOne({
      where: { id: findStudent.dataValues.classroom_id },
    });

    if (findClass?.dataValues.coins < coins) throw new CustomError("Coins are not enough!", 403);

    await Classroom.update(
      { coins: findClass?.dataValues.coins - coins },
      {
        where: {
          id: findClass?.dataValues.id,
        },
      }
    );

    await User.update(
      { coins: findStudent.dataValues.coins + coins },
      {
        where: {
          id,
        },
      }
    );

    res.status(201).json({ message: "Successfully graded" });
  } catch (error) {
    next(error);
  }
};

//--------MINUS COINS--------------------------------

export const minusCoins: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const coins: number = req.body.coins;

    if (!id) throw new CustomError("Invalid id provided", 403);
    if (!coins) throw new CustomError("Coins are required!", 403);

    const findStudent = await User.findOne({ where: { id } });

    if (!findStudent) throw new CustomError("No student found!", 403);

    const findClass = await Classroom.findOne({
      where: { id: findStudent.dataValues.classroom_id },
    });

    await Classroom.update(
      { coins: findClass?.dataValues.coins + coins },
      {
        where: {
          id: findClass?.dataValues.id,
        },
      }
    );

    await User.update(
      { coins: findStudent.dataValues.coins - coins },
      {
        where: {
          id,
        },
      }
    );

    res.status(201).json({ message: "Successfully graded" });
  } catch (error) {
    next(error);
  }
};
