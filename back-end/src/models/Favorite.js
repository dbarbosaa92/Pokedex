const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Favorite = sequelize.define('Favorite', {
    pokemonId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    pokemonName: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Favorite