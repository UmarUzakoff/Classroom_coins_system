"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connections_1 = require("../../../config/db/connections");
const Channel_1 = __importDefault(require("../Channel"));
const User_1 = __importDefault(require("../User"));
class UserChannel extends sequelize_1.Model {
    userId;
    channelId;
    verified;
    start_date;
    end_date;
}
UserChannel.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: User_1.default,
            key: "id",
        },
        allowNull: false,
    },
    channelId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Channel_1.default,
            key: "id",
        },
        allowNull: false,
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    end_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: connections_1.sequelize,
    tableName: "user_channels",
    createdAt: "start_date",
});
User_1.default.belongsToMany(Channel_1.default, { through: UserChannel });
Channel_1.default.belongsToMany(User_1.default, { through: UserChannel });
exports.default = UserChannel;
