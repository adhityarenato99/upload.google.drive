const { DataTypes } = require("sequelize")

module.exports = (sequelize, Sequelize) => {
    const Upload = sequelize.define('tbl_upload', {
        type: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        data: {
            type: DataTypes.STRING,
        }
    });

    return Upload
}