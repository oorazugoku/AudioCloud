'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsToMany(models.Playlist, { through: models.SP, onDelete: 'CASCADE' });

      Song.belongsTo(models.Album, { foreignKey: 'albumId', onDelete: 'CASCADE' });
      Song.belongsTo(models.User, { foreignKey: 'artistId', as: 'Artist', onDelete: 'CASCADE' });

      Song.hasMany(models.Comment, { foreignKey: 'songId', onDelete: 'CASCADE' });
    }
  }
  Song.init({
    albumId: {
      type: DataTypes.INTEGER,
    },
    artistId: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.STRING,
    },
    imageURL: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Song',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Song;
};
