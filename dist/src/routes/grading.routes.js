"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const grading_controller_1 = require("../controllers/grading.controller");
const admin_middleware_1 = __importDefault(require("../middlewares/admin.middleware"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.post("/coins/plus/student/:id", auth_middleware_1.default, admin_middleware_1.default, grading_controller_1.plusCoins);
router.post("/coins/minus/student/:id", auth_middleware_1.default, admin_middleware_1.default, grading_controller_1.minusCoins);
exports.default = router;
