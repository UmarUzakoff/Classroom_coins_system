import Joi from "joi";
import { IEditEmail, IEditPassword, ILogin, IUser } from "../types/user.types";

export const LoginSchema = (payload: ILogin) => {
  return Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(payload);
};

export const CreateStudentSchema = (payload: IUser) => {
  return Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().email().required(),
    classroom_id: Joi.number().required(),
  }).validate(payload);
};

export const EditEmailSchema = (payload: IEditEmail) => {
  return Joi.object({
    newEmail: Joi.string().email(),
    previousEmail: Joi.string().email(),
  }).validate(payload);
};

export const EditPasswordSchema = (payload: IEditPassword) => {
  return Joi.object({
    newPassword: Joi.string(),
    previousPassword: Joi.string(),
  }).validate(payload);
};
