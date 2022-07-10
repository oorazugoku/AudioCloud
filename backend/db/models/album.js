'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Album.hasMany(models.Song, { foreignKey: 'albumId', hooks: true });

      Album.belongsTo(models.Artist, { foreignKey: 'artistId', hooks: true });
      Album.belongsTo(models.Image, { foreignKey: 'previewImgId', hooks: true });
    }
  }
  Album.init({
    artistId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    previewImgId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
