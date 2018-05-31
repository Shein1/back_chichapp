import { Model } from 'sequelize';

export default class Store extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING
        },
        adress: {
          type: DataTypes.STRING
        },
        ref_photo: {
          type: DataTypes.STRING
        },
        schedule: {
          type: DataTypes.ARRAY(DataTypes.STRING)
        }
      },
      {
        sequelize: sequelize
      }
    );
  }
}
