"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connections_1 = require("../../config/db/connections");
class User extends sequelize_1.Model {
    id;
    name;
    surname;
    email;
    password;
    role;
    classroom_id;
    coins;
    created_at;
    updated_at;
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "$2b$12$oaOaQb4hy2PRocVtMIYdwuY6CCppnkwb3PHTEGlSbFdPDV2wX3k6m",
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "student",
    },
    classroom_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    coins: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    tableName: "users",
    sequelize: connections_1.sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
exports.default = User;
