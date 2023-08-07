"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCoinsToTheClassroom = exports.classroomDelete = exports.classroomsGet = exports.classroomGet = exports.classroomPost = void 0;
const joi_1 = __importDefault(require("joi"));
const User_1 = __importDefault(require("../models/User"));
const custom_error_1 = require("../types/custom-error");
const Classroom_1 = __importDefault(require("../models/Classroom"));
//--------CREATING A CLASSROOM--------------------------------
const classroomPost = async (req, res, next) => {
    try {
        const class_name = req.body.class_name;
        //VALIDATION
        const schema = joi_1.default.object({
            class_name: joi_1.default.string().required(),
        });
        const { error } = schema.validate({ class_name });
        if (error) {
            return res.status(403).json({ error: error.message });
        }
        //Checking if there is no any classroom with the same name
        const findClass = await Classroom_1.default.findOne({ where: { class_name } });
        if (findClass)
            throw new custom_error_1.CustomError("That classroom already exists!", 403);
        await Classroom_1.default.create({ class_name });
        res.status(201).json({ message: "Classroom successfully created" });
    }
    catch (error) {
        next(error);
    }
};
exports.classroomPost = classroomPost;
//--------GETTING A CLASSROOM--------------------------------
const classroomGet = async (req, res, next) => {
    try {
        const { id } = req.params;
        //VALIDATION
        if (!id)
            throw new custom_error_1.CustomError("Invalid id provided", 403);
        //GETTING ALL STUDENTS OF THE CLASSROOM --------------------------------
        const studentsOfThatClass = await User_1.default.findAll({
            where: { classroom_id: id },
        });
        const findClass = await Classroom_1.default.findOne({
            where: { id },
        });
        if (!findClass)
            throw new custom_error_1.CustomError("No classroom found!", 403);
        res.status(201).json({ findClass, studentsOfThatClass });
    }
    catch (error) {
        next(error);
    }
};
exports.classroomGet = classroomGet;
//--------GETTING All CLASSROOMS--------------------------------
const classroomsGet = async (req, res, next) => {
    try {
        const classrooms = await Classroom_1.default.findAll();
        res.status(201).json(classrooms);
    }
    catch (error) {
        next(error);
    }
};
exports.classroomsGet = classroomsGet;
//--------DELETING A CLASSROOM--------------------------------
const classroomDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findClass = await Classroom_1.default.findOne({
            where: { id },
        });
        if (!findClass)
            throw new custom_error_1.CustomError("No classroom found!", 403);
        await Classroom_1.default.destroy({ where: { id } });
        await User_1.default.destroy({ where: { classroom_id: id } });
        res.status(201).json({ message: `Classroom successfully deleted` });
    }
    catch (error) {
        next(error);
    }
};
exports.classroomDelete = classroomDelete;
//--------ADDING COINS TO CLASSROOM--------------------------------
const addCoinsToTheClassroom = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        if (!id)
            throw new custom_error_1.CustomError("Invalid id provided", 403);
        const findClass = await Classroom_1.default.findOne({ where: { id } });
        if (!findClass)
            throw new custom_error_1.CustomError("No classroom found!", 403);
        await Classroom_1.default.update({ coins: 1500 }, {
            where: {
                id,
            },
        });
        await User_1.default.update({ coins: 0 }, {
            where: {
                classroom_id: id,
            },
        });
        res
            .status(201)
            .json({ message: "Coins successfully added to the classroom!" });
    }
    catch (error) {
        next(error);
    }
};
exports.addCoinsToTheClassroom = addCoinsToTheClassroom;
