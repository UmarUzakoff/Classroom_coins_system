"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const students_controller_1 = require("../controllers/students.controller");
const admin_middleware_1 = __importDefault(require("../middlewares/admin.middleware"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.post("/student", auth_middleware_1.default, admin_middleware_1.default, students_controller_1.studentPost);
router.delete("/student/:id", auth_middleware_1.default, admin_middleware_1.default, students_controller_1.studentDelete);
router.get("/student/:id", auth_middleware_1.default, admin_middleware_1.default, students_controller_1.studentGet);
router.get("/userinfo", auth_middleware_1.default, students_controller_1.userInfo);
router.put("/userinfo/edit/email", auth_middleware_1.default, students_controller_1.editUserEmail);
router.put("/userinfo/edit/password", auth_middleware_1.default, students_controller_1.editUserPassword);
router.get("/student/class/room", auth_middleware_1.default, students_controller_1.studentsClassroom);
exports.default = router;
