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
      Album.hasMany(models.Song, { foreignKey: 'songId', hooks: true });

      Album.belongsTo(models.Image, { foreignKey: 'previewImgId', hooks: true });
    }
  }
  Album.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    previewImgId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
