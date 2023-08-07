import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db/connections";

class User extends Model {
  public id!: number;
  public name!: string;
  public surname!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public classroom_id!: number;
  public coins!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      defaultValue:
        "$2b$12$oaOaQb4hy2PRocVtMIYdwuY6CCppnkwb3PHTEGlSbFdPDV2wX3k6m",
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "student",
    },
    classroom_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coins: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "users",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default User;
