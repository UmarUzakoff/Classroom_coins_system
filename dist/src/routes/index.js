"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./auth.routes"));
const classroom_routes_1 = __importDefault(require("./classroom.routes"));
const students_routes_1 = __importDefault(require("./students.routes"));
const grading_routes_1 = __importDefault(require("./grading.routes"));
exports.default = [auth_routes_1.default, classroom_routes_1.default, students_routes_1.default, grading_routes_1.default];
