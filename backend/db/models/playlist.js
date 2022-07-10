'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Playlist.belongsToMany(models.Song, { through: models.SP, onDelete: 'CASCADE' });
    }
  }
  Playlist.init({
    userId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    imageURL: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Playlist',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId']
      }
    }
  });
  return Playlist;
};
