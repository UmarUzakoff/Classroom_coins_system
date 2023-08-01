"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_routes_1 = __importDefault(require("./admin.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const channel_routes_1 = __importDefault(require("./channel.routes"));
const users_routes_1 = __importDefault(require("./users.routes"));
const payment_routes_1 = __importDefault(require("./payment.routes"));
exports.default = [admin_routes_1.default, auth_routes_1.default, channel_routes_1.default, users_routes_1.default, payment_routes_1.default];
