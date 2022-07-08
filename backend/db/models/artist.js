'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Artist.belongsTo(models.Song, { foreignKey: 'songId' });
      Artist.belongsTo(models.Album, { foreignKey: 'albumId' });
    }
  }
  Artist.init({
    songId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};
