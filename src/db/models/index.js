import sequelize from "../config/index.js"
import BlogPost from "./BlogPostModel.js"
import Author from "./AuthorModel.js"
import Category from './CategoryModel.js'

Author.hasMany(BlogPost)
BlogPost.belongsTo(Author)

Category.hasMany(BlogPost)
BlogPost.belongsTo(Category)

export { sequelize, Author, BlogPost, Category }