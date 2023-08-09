const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./db-connect')

const entriDetails = sequelize.define('entri', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tamil: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    english: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    maths: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'entri',
    timestamps: false
});

module.exports={entriDetails}