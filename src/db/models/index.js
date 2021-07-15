import sequelize from "../config/index.js"
import BlogPost from "./BlogPostModel.js"
import Author from "./AuthorModel.js"
import Category from './CategoryModel.js'
import Comment from './CommentModel.js'
import striptags from 'striptags'

Author.hasMany(BlogPost, {foreignKey: {allowNull: false}})
BlogPost.belongsTo(Author, {foreignKey: {allowNull: false}})

Author.hasMany(Comment, {foreignKey: {allowNull: false}})
Comment.belongsTo(Author, {foreignKey: {allowNull: false}})

Category.hasMany(BlogPost)
BlogPost.belongsTo(Category)

BlogPost.hasMany(Comment, {foreignKey: {allowNull: false}})
Comment.belongsTo(BlogPost, {foreignKey: {allowNull: false}})

// ================================================================================

Author.beforeValidate((user) => {
    if(!user.avatar){
        user.avatar = `https://eu.ui-avatars.com/api/?name=${user.name}+${user.surname}`
    }
})

Author.beforeUpdate((user) => {
    if(user.avatar.includes(`https://eu.ui-avatars.com`)) {
        user.avatar = `https://eu.ui-avatars.com/api/?name=${user.name}+${user.surname}`
    }
})

BlogPost.beforeValidate((user) => {
    if(!user.cover) {
        user.cover = `https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png`
    }
    user.read_time_value = Math.floor(striptags(user.content).length / 225) + 1;
    user.read_time_unit = user.read_time_value === 1 ? "minute" : "minutes";
    // user.content = striptags(user.content);
})

BlogPost.beforeUpdate((user) => {
    user.read_time_value = Math.floor(striptags(user.content).length / 225) + 1;
    user.read_time_unit = user.read_time_value === 1 ? "minute" : "minutes";
    // user.content = striptags(user.content);
})

export { sequelize, Author, BlogPost, Category, Comment }