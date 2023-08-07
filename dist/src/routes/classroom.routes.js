"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classrooms_controller_1 = require("../controllers/classrooms.controller");
const admin_middleware_1 = __importDefault(require("../middlewares/admin.middleware"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.post("/classroom", auth_middleware_1.default, admin_middleware_1.default, classrooms_controller_1.classroomPost);
router.get("/classroom/:id", auth_middleware_1.default, admin_middleware_1.default, classrooms_controller_1.classroomGet);
router.get("/classrooms", auth_middleware_1.default, admin_middleware_1.default, classrooms_controller_1.classroomsGet);
router.delete("/classroom/:id", auth_middleware_1.default, admin_middleware_1.default, classrooms_controller_1.classroomDelete);
router.put("/classroom/addcoins/:id", auth_middleware_1.default, admin_middleware_1.default, classrooms_controller_1.addCoinsToTheClassroom);
exports.default = router;
