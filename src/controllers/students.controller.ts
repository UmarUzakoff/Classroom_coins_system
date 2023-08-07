import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import Classroom from "../models/Classroom";
import User from "../models/User";
import { CustomError } from "../types/custom-error";
import {
  IEditEmail,
  IEditPassword,
  IUser,
} from "../types/user.types";
import {
  CreateStudentSchema,
  EditEmailSchema,
  EditPasswordSchema,
} from "../validations/user.validate";
import { sign } from "../utils/jwt";

interface IUserRequest extends Request {
  verifiedUser: any;
}

//--------CREATING A STUDENT--------------------------------

export const studentPost: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, surname, email, classroom_id } = req.body as IUser;

    //VALIDATION
    const { error } = CreateStudentSchema({
      name,
      surname,
      email,
      classroom_id,
    });
    if (error) throw new CustomError(error.message, 400);

    //Checking if there is no any student with the same email
    const findStudent: any = await User.findOne({ where: { email } });

    if (findStudent)
      throw new CustomError("Student with the same email already exists!", 403);

    //CHECKING IF THERE IS A CLASSROOM WITH THE SAME ID
    const findClass = await Classroom.findOne({ where: { id: classroom_id } });

    if (!findClass) throw new CustomError("Classroom not found!", 403);

    await User.create({ name, surname, email, classroom_id });
    res
      .status(201)
      .json({ message: `Welcome to our class ${name} ${surname}` });
  } catch (error) {
    next(error);
  }
};

//--------DELETING A STUDENT--------------------------------

export const studentDelete: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const findStudent: any = await User.findOne({
      where: { id },
    });
    if (!findStudent) throw new CustomError("No student found!", 403);

    await User.destroy({ where: { id } });
    res.status(201).json({ message: `${findStudent.dataValues.name} successfully deleted` });
  } catch (error) {
    next(error);
  }
};

//--------GETTING A STUDENT--------------------------------

export const studentGet: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    //VALIDATION
    if (!id) throw new CustomError("Invalid id provided", 403);

    //Checking if a sdudent wtih the same ID exists
    const findStudent: any = await User.findOne({
      where: { id },
    });

    if (!findStudent) throw new CustomError("No student found!", 403);

    const studentsClassroom = await Classroom.findOne({
      where: { id: findStudent.dataValues.classroom_id },
    });

    const className = studentsClassroom?.dataValues.class_name;


    res.status(201).json({findStudent, className});
  } catch (error) {
    next(error);
  }
};

//--------USER ACCOUNT--------------------------------

export const userInfo: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const verifiedUser = (req as IUserRequest).verifiedUser;

    const studentsClassroom = await Classroom.findOne({
      where: { id: verifiedUser.classroom_id },
    });

    const className = studentsClassroom?.dataValues.class_name;

    res.status(201).json({ verifiedUser, className });
  } catch (error) {
    next(error);
  }
};

//--------STUDENT's CLASSROOM--------------------------------

export const studentsClassroom: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const verifiedUser = (req as IUserRequest).verifiedUser;

    //GETTING ALL STUDENTS OF THE CLASSROOM
    const studentsOfThatClass: any = await User.findAll({
      where: { classroom_id: verifiedUser.classroom_id },
    });

    const findClass: any = await Classroom.findOne({
      where: { id: verifiedUser.classroom_id },
    });

    if (!findClass) throw new CustomError("No classroom found!", 403);

    res.status(201).json({ findClass, studentsOfThatClass });
  } catch (error) {
    next(error);
  }
};

//--------STUDENT CAN EDIT HIS/HER ACCOUNT--------------------------------

export const editUserEmail: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const verifiedUser = (req as IUserRequest).verifiedUser;

    const { previousEmail, newEmail } = req.body as IEditEmail;

    //VALIDATION
    const { error } = EditEmailSchema({
      newEmail,
      previousEmail,
    });
    if (error) throw new CustomError(error.message, 400);

    if (newEmail === previousEmail)
      throw new CustomError(
        "Previous and New values should be different!",
        403
      );

    //Finding a student
    const findUser: any = await User.findOne({
      where: { email: previousEmail },
    });

    if (!findUser || findUser.dataValues.email !== verifiedUser.email)
      throw new CustomError("Previous email do not match to the original one!", 403);

    await User.update(
      { email: newEmail },
      {
        where: {
          id: verifiedUser.id,
        },
      }
    );

    const token = sign({ email: newEmail });
    res
      .status(200)
      .json({ message: "Your account successfully edited!", token });
  } catch (error) {
    next(error);
  }
};

export const editUserPassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const verifiedUser = (req as IUserRequest).verifiedUser;

    const { previousPassword, newPassword } = req.body as IEditPassword;

    //VALIDATION
    const { error } = EditPasswordSchema({
      newPassword,
      previousPassword,
    });
    if (error) throw new CustomError(error.message, 400);

    if (newPassword === previousPassword)
      throw new CustomError(
        "Previous and New values should be different!",
        403
      );

    //Finding a student and Comparing Hash Values
    const comparePassword = await bcrypt.compare(
      previousPassword,
      verifiedUser.password
    );

    if (!comparePassword)
      throw new CustomError("Previous password do not match to the original one!", 403);

    const newHashedPassword = await bcrypt.hash(newPassword, 12);

    await User.update(
      { password: newHashedPassword },
      {
        where: {
          id: verifiedUser.id,
        },
      }
    );

    res.status(200).json({ message: "Your account successfully edited!" });
  } catch (error) {
    next(error);
  }
};
