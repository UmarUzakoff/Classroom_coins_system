import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";
import User from "../models/User";
import { CustomError } from "../types/custom-error";
import Classroom from "../models/Classroom";

//--------CREATING A CLASSROOM--------------------------------

export const classroomPost: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const class_name: string = req.body.class_name;

    //VALIDATION
    const schema = Joi.object({
      class_name: Joi.string().required(),
    });

    const { error } = schema.validate({ class_name });
    if (error) {
      return res.status(403).json({ error: error.message });
    }

    //Checking if there is no any classroom with the same name
    const findClass: any = await Classroom.findOne({ where: { class_name } });

    if (findClass) throw new CustomError("That classroom already exists!", 403);

    await Classroom.create({ class_name });
    res.status(201).json({ message: "Classroom successfully created" });
  } catch (error) {
    next(error);
  }
};

//--------GETTING A CLASSROOM--------------------------------

export const classroomGet: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    //VALIDATION
    if (!id) throw new CustomError("Invalid id provided", 403);

    //GETTING ALL STUDENTS OF THE CLASSROOM --------------------------------
    const studentsOfThatClass: any = await User.findAll({
      where: { classroom_id: id },
    });

    const findClass: any = await Classroom.findOne({
      where: { id },
    });

    if (!findClass) throw new CustomError("No classroom found!", 403);

    res.status(201).json({ findClass, studentsOfThatClass });
  } catch (error) {
    next(error);
  }
};

//--------GETTING All CLASSROOMS--------------------------------

export const classroomsGet: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classrooms = await Classroom.findAll();

    res.status(201).json(classrooms);
  } catch (error) {
    next(error);
  }
};

//--------DELETING A CLASSROOM--------------------------------

export const classroomDelete: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const findClass: any = await Classroom.findOne({
      where: { id },
    });
    if (!findClass) throw new CustomError("No classroom found!", 403);

    await Classroom.destroy({ where: { id } });
    await User.destroy({ where: { classroom_id: id } });
    res.status(201).json({ message: `Classroom successfully deleted` });
  } catch (error) {
    next(error);
  }
};

//--------ADDING COINS TO CLASSROOM--------------------------------

export const addCoinsToTheClassroom: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    console.log(id);
    

    if (!id) throw new CustomError("Invalid id provided", 403);

    const findClass = await Classroom.findOne({ where: { id } });

    if (!findClass) throw new CustomError("No classroom found!", 403);

    await Classroom.update(
      { coins: 1500 },
      {
        where: {
          id,
        },
      }
    );

    await User.update(
      { coins: 0 },
      {
        where: {
          classroom_id: id,
        },
      }
    );

    res
      .status(201)
      .json({ message: "Coins successfully added to the classroom!" });
  } catch (error) {
    next(error);
  }
};
