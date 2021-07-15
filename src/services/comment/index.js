import { Router } from "express"
import { Author, Comment } from "../../db/models/index.js"
import sequelize from "sequelize"

const { Op } = sequelize

const router = Router()

router.route('/')
    // ===============  RETRIEVES LIST OF CCOMMENTS =======================
    .get( async (req, res, next) => {
        try {
            const data = await Comment.findAll({
                include: { model: Author, attributes: ['id', 'name', 'avatar']}
            })
            res.send(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
    // ===============  CREATES NEW COMMENT =======================
    .post( async (req, res, next) => {
        try {
            const data = await Comment.create(req.body)
            res.send(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

router.route('/:commentId')
   // ===============  RETRIEVES SINGLE Comment =======================
    .get( async (req, res, next) => {
        try {
            const data = await Comment.findByPk(req.params.commentId, {
                include: { model: Author, attributes: ['id', 'name', 'avatar']}
            })
            res.send(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
    // ===============  UPDATES A Comment =======================
    .put( async (req, res, next) => {
        try {
            const data = await Comment.update(req.body, {
                where: { id: req.params.commentId},
                returning: true,
            })

            res.send(data[1][0])
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
    // ===============  DELETES A Comment =======================
    .delete( async (req, res, next) => {
        try {
            const rowsCount = await Comment.destroy({ where: { id: req.params.commentId} })

            if(rowsCount === 0) {
                res.status(404).send(`Comment with id: ${req.params.commentId} Not Found!`)
            } else {
                res.send(`Comment with id: ${req.params.commentId}, successfully deleted!`)
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

    export default router