import { Model } from 'sequelize';

export default class Hookah extends Model {
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
        rating: {
          type: DataTypes.DOUBLE
        },
        schedule: {
          type: DataTypes.ARRAY(DataTypes.STRING)
        },
        ref_photo: {
          type: DataTypes.STRING
        },
        latitude: {
          type: DataTypes.STRING
        },
        longitude: {
          type: DataTypes.STRING
        }
      },
      {
        sequelize: sequelize
      }
    );
  }
}
