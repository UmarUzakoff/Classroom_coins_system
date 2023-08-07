"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connections_1 = require("../../config/db/connections");
class Classroom extends sequelize_1.Model {
    id;
    class_name;
    coins;
    created_at;
    updated_at;
}
Classroom.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    class_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    coins: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1500,
    },
}, {
    tableName: "classrooms",
    sequelize: connections_1.sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
exports.default = Classroom;
