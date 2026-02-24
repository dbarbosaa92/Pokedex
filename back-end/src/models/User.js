const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Favorite = require('./Favorite')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true //impede emails repetidos
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false 
    }
})

User.hasMany(Favorite)
Favorite.belongsTo(User)

module.exports = User