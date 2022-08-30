'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class songLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      songLike.belongsTo(models.Song, { foreignKey: 'songId', onDelete: 'CASCADE' });
      songLike.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }
  songLike.init({
    userId: {
      type: DataTypes.INTEGER
    },
    songId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'songLike',
  });
  return songLike;
};
