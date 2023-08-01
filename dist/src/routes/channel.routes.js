"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const channels_controller_1 = require("../controllers/channels.controller");
const router = (0, express_1.Router)();
router.get("/channels", channels_controller_1.ChannelsGet);
router.get("/channels/:id", channels_controller_1.GetExactChannel);
exports.default = router;
