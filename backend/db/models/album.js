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
      Album.hasMany(models.Song, { foreignKey: 'albumId', as: 'Songs', hooks: true });

      Album.belongsTo(models.User, { foreignKey: 'artistId', as: 'Artist', hooks: true });
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
    scopes: {
      preview: {
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'description', 'artistId']
        }
      }
    }
  });
  return Album;
};
