const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Favorite = sequelize.define("Favorite", {

   id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pokemonId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pokemonName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Favorite