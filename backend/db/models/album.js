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

      Album.belongsTo(models.User, { foreignKey: 'artistId', hooks: true });
    }
  }
  Album.init({
    artistId: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    imageURL: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
