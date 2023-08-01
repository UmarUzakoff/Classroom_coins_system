import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../config/db/connections";
import Channel from "../Channel";
import User from "../User";

class UserChannel extends Model {
  public userId!: number;
  public channelId!: number;
  public verified!: boolean;
  public start_date!: Date;
  public end_date!: Date;
}

UserChannel.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
    channelId: {
      type: DataTypes.INTEGER,
      references: {
        model: Channel,
        key: "id",
      },
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "user_channels",
    createdAt: "start_date",
  }
);

User.belongsToMany(Channel, { through: UserChannel });
Channel.belongsToMany(User, { through: UserChannel });

export default UserChannel;
