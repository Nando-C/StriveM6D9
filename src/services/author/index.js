import { Router } from "express"
import { Author } from "../../db/models/index.js"
import sequelize from "sequelize"

const { Op } = sequelize

const router = Router()

router.route('/')
    // ===============  RETRIEVES LIST OF AUTHORS =======================
    .get( async (req, res, next) => {
        try {
            const filters = []
            const keys = Object.keys(req.query)

            keys.forEach(key => {
                let element

                if(key === 'age') {
                    element = { [key]: {[Op.eq]: parseInt(req.query[key])} }
                } else {
                    element = { [key]: {[Op.substring]: req.query[key]} }
                }
                filters.push(element)
            })

            const data = await Author.findAll({
                // attributes: { exclude: ['createdAt', 'updatedAt']},
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
    // ===============  CREATES NEW AUTHOR =======================
    .post( async (req, res, next) => {
        try {
            const data = await Author.create(req.body)
            res.send(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

router.route('/:authorId')
   // ===============  RETRIEVES SINGLE AUTHOR =======================
    .get( async (req, res, next) => {
        try {
            const data = await Author.findByPk(req.params.authorId)
            res.send(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
    // ===============  UPDATES AN AUTHOR =======================
    .put( async (req, res, next) => {
        try {
            const data = await Author.update(req.body, {
                where: { id: req.params.authorId},
                returning: true,
            })

            res.send(data[1][0])
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
    // ===============  DELETES AN AUTHOR =======================
    .delete( async (req, res, next) => {
        try {
            const rowsCount = await Author.destroy({ where: { id: req.params.authorId} })

            if(rowsCount === 0) {
                res.status(404).send(`Author with id: ${req.params.authorId} Not Found!`)
            } else {
                res.send(`Author with id: ${req.params.authorId}, successfully deleted!`)
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

    export default router