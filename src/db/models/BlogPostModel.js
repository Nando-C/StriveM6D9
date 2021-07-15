import sequelize from "../config/index.js";
import s from 'sequelize'

const { DataTypes } = s

const BlogPost = sequelize.define('blog_post', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    cover:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    read_time_value:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    read_time_unit:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
})

export default BlogPost