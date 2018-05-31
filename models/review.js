import { Model } from 'sequelize';

export default class Review extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        id_user: {
          type: DataTypes.STRING
        },
        id_shisha: {
          type: DataTypes.STRING
        },
        review: {
          type: DataTypes.STRING
        }
      },
      {
        sequelize: sequelize
      }
    );
  }
}
