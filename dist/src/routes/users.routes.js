"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.post("/subscription/:id", auth_middleware_1.default, users_controller_1.Subscription);
router.get("/myacc/subs", auth_middleware_1.default, users_controller_1.usersubscriptions);
router.put("/myacc/edit", auth_middleware_1.default, users_controller_1.EditUser);
exports.default = router;
