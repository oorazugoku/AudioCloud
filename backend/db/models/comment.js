'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.hasOne(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      Comment.belongsTo(models.Song, { foreignKey: 'commentId', onDelete: 'CASCADE' });
    }
  }
  Comment.init({
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
