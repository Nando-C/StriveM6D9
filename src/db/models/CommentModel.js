import sequelize from "../config/index.js";
import s from 'sequelize'

const { DataTypes } = s

const Comment = sequelize.define('comment', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    comment:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
})

export default Comment