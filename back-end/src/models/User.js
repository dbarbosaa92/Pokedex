const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

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
        allownull: false 
    }
})

module.exports = User