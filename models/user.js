import { Model } from 'sequelize';
import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';

export default class User extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        nickname: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true
          },
          unique: {
            args: true,
            msg: 'Email already in use'
          }
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        password_confirmation: {
          type: Sequelize.VIRTUAL
        }
      },
      {
        sequelize: sequelize,
        hooks: {
          beforeCreate: function(User) {
            if (User.password != User.password_confirmation) {
              throw "error password don't match!";
            }

            let salt = bcrypt.genSaltSync();
            User.password = bcrypt.hashSync(User.password, salt);
          }
        }
      },
      {
        underscored: true
      }
    );
  }

  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}
