import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db/connections";

class Classroom extends Model {
  public id!: number;
  public class_name!: string;
  public coins!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Classroom.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    class_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coins: {
      type: DataTypes.INTEGER,
      defaultValue: 1500,
    },
  },
  {
    tableName: "classrooms",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Classroom;
