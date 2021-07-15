import sequelize from "../config/index.js"
import BlogPost from "./BlogPostModel.js"
import Author from "./AuthorModel.js"
import Category from './CategoryModel.js'
import Comment from './CommentModel.js'

Author.hasMany(BlogPost)
BlogPost.belongsTo(Author)

Author.hasMany(Comment)
Comment.belongsTo(Author)

Category.hasMany(BlogPost)
BlogPost.belongsTo(Category)

BlogPost.hasMany(Comment, {foreignKey: {allowNull: false}})
Comment.belongsTo(BlogPost, {foreignKey: {allowNull: false}})


export { sequelize, Author, BlogPost, Category, Comment }