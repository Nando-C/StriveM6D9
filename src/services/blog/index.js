import { Router } from "express";
import { Author, BlogPost, Category } from "../../db/models/index.js";
import sequelize from "sequelize";

const { Op } = sequelize

const router = Router()

router.route('/')
    // ===============  RETRIEVES LIST OF BLOG POSTS =======================
    .get( async (req, res, next) => {
        try {
            const filters = []
            const keys = Object.keys(req.query)

            keys.forEach(key => {
                let element

                if(key === 'read_time_value') {
                    element = { [key]: {[Op.eq]: parseInt(req.query[key])} }
                } else {
                    element = { [key]: {[Op.substring]: req.query[key]} }
                }
                filters.push(element)
            })

            const data = await BlogPost.findAll({
                include: [
                    {model: Author, attributes: ['id', 'name', 'avatar'] },
                    {model: Category, attributes: ['id', 'name'] },
                ],
                attributes: { exclude: ['authorId', 'categoryId']},
                where: filters.length > 0 
                        ? {[Op.or]: filters}
                        : {}
            })
            res.send(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
    // ===============  CREATES A NEW BLOG POST =======================
    .post( async (req, res, next) => {
        try {
            const data = await BlogPost.create(req.body)
            res.send(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

router.route('/:postId')
    // ===============  RETRIEVES SINGLE BLOG POST =======================
    .get( async (req, res, next) => {
        try {
            const data = await BlogPost.findByPk(req.params.postId, {
                include: [
                    {model: Author, attributes: ['id', 'name', 'avatar'] },
                    {model: Category, attributes: ['id', 'name'] },
                ],
                attributes: { exclude: ['authorId', 'categoryId']}
                }
            )
            res.send(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
    // ===============  UPDATES A BLOG POST =======================
    .put( async (req, res, next) => {
        try {
            const data = await BlogPost.update( 
                req.body, 
                {
                    where: { id: req.params.postId},
                    returning: true,
                }
            )
            res.send(data[1][0])
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
    // ===============  DELETES A BLOG POST =======================
    .delete( async (req, res, next) => {
        try {
            const rowsCount = await BlogPost.destroy({where: {id: req.params.postId}})
            if(rowsCount === 0) {
                res.status(404).send(`Blog post with id: ${req.params.postId} Not Found!`)
            } else {
                res.send(`Blog post with id: ${req.params.postId}, successfully deleted!`)
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

    export default router