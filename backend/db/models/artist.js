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
      Artist.hasMany(models.Song, { foreignKey: 'artistId' });
      Artist.hasMany(models.Album, { foreignKey: 'artistId' });
    }
  }
  Artist.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};
