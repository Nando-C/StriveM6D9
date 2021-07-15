import { Router } from "express"
import { BlogPost, Category } from "../../db/models/index.js"
import sequelize from "sequelize"

const { Op } = sequelize

const router = Router()

router.route('/')
    // ===============  RETRIEVES LIST OF CATEGORIES =======================
    .get( async (req, res, next) => {
        try {
            const data = await Category.findAll({
                include: { model: BlogPost, attributes: ['id', 'title', 'cover']}
            })
            res.send(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
    // ===============  CREATES NEW CATEGORY =======================
    .post( async (req, res, next) => {
        try {
            // const data = await Category.bulkCreate([
            //     { name: "News" },
            //     { name: "Sport" },
            //     { name: "Technology" },
            //   ])

            const data = await Category.create(req.body)
            res.send(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

router.route('/:categoryId')
   // ===============  RETRIEVES SINGLE CATEGORY =======================
    .get( async (req, res, next) => {
        try {
            const data = await Category.findByPk(req.params.categoryId, {
                include: { model: BlogPost, attributes: ['id', 'title', 'cover']}
            })
            res.send(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
    // ===============  UPDATES A CATEGORY =======================
    .put( async (req, res, next) => {
        try {
            const data = await Category.update(req.body, {
                where: { id: req.params.categoryId},
                returning: true,
            })

            res.send(data[1][0])
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
    // ===============  DELETES A CATEGORY =======================
    .delete( async (req, res, next) => {
        try {
            const rowsCount = await Category.destroy({ where: { id: req.params.categoryId} })

            if(rowsCount === 0) {
                res.status(404).send(`Category with id: ${req.params.categoryId} Not Found!`)
            } else {
                res.send(`Category with id: ${req.params.categoryId}, successfully deleted!`)
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

    export default router