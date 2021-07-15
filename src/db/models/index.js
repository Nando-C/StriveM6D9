import sequelize from "../config/index.js"
import BlogPost from "./BlogPostModel.js"
import Author from "./AuthorModel.js"

Author.hasMany(BlogPost)
BlogPost.belongsTo(Author)

export { sequelize, Author, BlogPost }