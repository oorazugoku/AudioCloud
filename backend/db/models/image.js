'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      Image.hasOne(models.Album, { foreignKey: 'previewImgId', onDelete: 'CASCADE' });
      Image.hasOne(models.Playlist, { foreignKey: 'previewImgId', onDelete: 'CASCADE' });
      Image.hasOne(models.Song, { foreignKey: 'previewImgId', onDelete: 'CASCADE' });
    }
  }
  Image.init({
    userId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
