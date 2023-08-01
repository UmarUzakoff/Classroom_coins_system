"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const admin_middleware_1 = __importDefault(require("../middlewares/admin.middleware"));
const router = (0, express_1.Router)();
router.get("/users", admin_middleware_1.default, admin_controller_1.GetAllUsers);
router.get("/subscriptions", admin_middleware_1.default, admin_controller_1.UsersChannelsGet);
router.get("/channelsubscribers/:id", admin_middleware_1.default, admin_controller_1.channelsubscribers);
router.post("/channels/post", admin_middleware_1.default, admin_controller_1.ChannelPost);
router.delete("/users/delete/:id", admin_middleware_1.default, admin_controller_1.deleteUser);
exports.default = router;
