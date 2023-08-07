"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserPassword = exports.editUserEmail = exports.studentsClassroom = exports.userInfo = exports.studentGet = exports.studentDelete = exports.studentPost = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Classroom_1 = __importDefault(require("../models/Classroom"));
const User_1 = __importDefault(require("../models/User"));
const custom_error_1 = require("../types/custom-error");
const user_validate_1 = require("../validations/user.validate");
const jwt_1 = require("../utils/jwt");
//--------CREATING A STUDENT--------------------------------
const studentPost = async (req, res, next) => {
    try {
        const { name, surname, email, classroom_id } = req.body;
        //VALIDATION
        const { error } = (0, user_validate_1.CreateStudentSchema)({
            name,
            surname,
            email,
            classroom_id,
        });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        //Checking if there is no any student with the same email
        const findStudent = await User_1.default.findOne({ where: { email } });
        if (findStudent)
            throw new custom_error_1.CustomError("Student with the same email already exists!", 403);
        //CHECKING IF THERE IS A CLASSROOM WITH THE SAME ID
        const findClass = await Classroom_1.default.findOne({ where: { id: classroom_id } });
        if (!findClass)
            throw new custom_error_1.CustomError("Classroom not found!", 403);
        await User_1.default.create({ name, surname, email, classroom_id });
        res
            .status(201)
            .json({ message: `Welcome to our class ${name} ${surname}` });
    }
    catch (error) {
        next(error);
    }
};
exports.studentPost = studentPost;
//--------DELETING A STUDENT--------------------------------
const studentDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findStudent = await User_1.default.findOne({
            where: { id },
        });
        if (!findStudent)
            throw new custom_error_1.CustomError("No student found!", 403);
        await User_1.default.destroy({ where: { id } });
        res.status(201).json({ message: `${findStudent.dataValues.name} successfully deleted` });
    }
    catch (error) {
        next(error);
    }
};
exports.studentDelete = studentDelete;
//--------GETTING A STUDENT--------------------------------
const studentGet = async (req, res, next) => {
    try {
        const { id } = req.params;
        //VALIDATION
        if (!id)
            throw new custom_error_1.CustomError("Invalid id provided", 403);
        //Checking if a sdudent wtih the same ID exists
        const findStudent = await User_1.default.findOne({
            where: { id },
        });
        if (!findStudent)
            throw new custom_error_1.CustomError("No student found!", 403);
        const studentsClassroom = await Classroom_1.default.findOne({
            where: { id: findStudent.dataValues.classroom_id },
        });
        const className = studentsClassroom?.dataValues.class_name;
        res.status(201).json({ findStudent, className });
    }
    catch (error) {
        next(error);
    }
};
exports.studentGet = studentGet;
//--------USER ACCOUNT--------------------------------
const userInfo = async (req, res, next) => {
    try {
        const verifiedUser = req.verifiedUser;
        const studentsClassroom = await Classroom_1.default.findOne({
            where: { id: verifiedUser.classroom_id },
        });
        const className = studentsClassroom?.dataValues.class_name;
        res.status(201).json({ verifiedUser, className });
    }
    catch (error) {
        next(error);
    }
};
exports.userInfo = userInfo;
//--------STUDENT's CLASSROOM--------------------------------
const studentsClassroom = async (req, res, next) => {
    try {
        const verifiedUser = req.verifiedUser;
        //GETTING ALL STUDENTS OF THE CLASSROOM
        const studentsOfThatClass = await User_1.default.findAll({
            where: { classroom_id: verifiedUser.classroom_id },
        });
        const findClass = await Classroom_1.default.findOne({
            where: { id: verifiedUser.classroom_id },
        });
        if (!findClass)
            throw new custom_error_1.CustomError("No classroom found!", 403);
        res.status(201).json({ findClass, studentsOfThatClass });
    }
    catch (error) {
        next(error);
    }
};
exports.studentsClassroom = studentsClassroom;
//--------STUDENT CAN EDIT HIS/HER ACCOUNT--------------------------------
const editUserEmail = async (req, res, next) => {
    try {
        const verifiedUser = req.verifiedUser;
        const { previousEmail, newEmail } = req.body;
        //VALIDATION
        const { error } = (0, user_validate_1.EditEmailSchema)({
            newEmail,
            previousEmail,
        });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        if (newEmail === previousEmail)
            throw new custom_error_1.CustomError("Previous and New values should be different!", 403);
        //Finding a student
        const findUser = await User_1.default.findOne({
            where: { email: previousEmail },
        });
        if (!findUser || findUser.dataValues.email !== verifiedUser.email)
            throw new custom_error_1.CustomError("Previous email do not match to the original one!", 403);
        await User_1.default.update({ email: newEmail }, {
            where: {
                id: verifiedUser.id,
            },
        });
        const token = (0, jwt_1.sign)({ email: newEmail });
        res
            .status(200)
            .json({ message: "Your account successfully edited!", token });
    }
    catch (error) {
        next(error);
    }
};
exports.editUserEmail = editUserEmail;
const editUserPassword = async (req, res, next) => {
    try {
        const verifiedUser = req.verifiedUser;
        const { previousPassword, newPassword } = req.body;
        //VALIDATION
        const { error } = (0, user_validate_1.EditPasswordSchema)({
            newPassword,
            previousPassword,
        });
        if (error)
            throw new custom_error_1.CustomError(error.message, 400);
        if (newPassword === previousPassword)
            throw new custom_error_1.CustomError("Previous and New values should be different!", 403);
        //Finding a student and Comparing Hash Values
        const comparePassword = await bcrypt_1.default.compare(previousPassword, verifiedUser.password);
        if (!comparePassword)
            throw new custom_error_1.CustomError("Previous password do not match to the original one!", 403);
        const newHashedPassword = await bcrypt_1.default.hash(newPassword, 12);
        await User_1.default.update({ password: newHashedPassword }, {
            where: {
                id: verifiedUser.id,
            },
        });
        res.status(200).json({ message: "Your account successfully edited!" });
    }
    catch (error) {
        next(error);
    }
};
exports.editUserPassword = editUserPassword;
