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

      Song.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      Song.belongsTo(models.Album, { foreignKey: 'albumId', onDelete: 'CASCADE' });
      Song.belongsTo(models.Artist, { foreignKey: 'artistId', onDelete: 'CASCADE' });
      Song.belongsTo(models.Image, { foreignKey: 'previewImgId', onDelete: 'CASCADE' });

      Song.hasMany(models.Comment, { foreignKey: 'songId', onDelete: 'CASCADE' });
    }
  }
  Song.init({
    userId: {
      type: DataTypes.INTEGER,
    },
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
    previewImgId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
