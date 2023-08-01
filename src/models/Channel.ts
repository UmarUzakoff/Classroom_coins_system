import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db/connections";

class Channel extends Model {
  public id!: number;
  public name!: string;
  public subscription_price!: number;
  public subscribers!: number;
  public duration!: number; // in days
  public created_at!: Date;
  public updated_at!: Date;
}

Channel.init(
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
      unique: true,
    },
    subscription_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subscribers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "channels",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Channel;
