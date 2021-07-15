import { Router } from "express"
import { Author, Comment } from "../../db/models/index.js"
import sequelize from "sequelize"

const { Op } = sequelize

const router = Router()

router.route('/:postId')
    // ===============  RETRIEVES LIST OF COMMENTS FROM A SINGLE BLOGPOST =======================
    .get( async (req, res, next) => {
        try {
            const data = await Comment.findAll({
                include: { model: Author, attributes: ['id', 'name', 'avatar']},
                where: { blogPostId: req.params.postId},
                attributes: { exclude: ['authorId']},
            })
            res.send(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
    // ===============  CREATES NEW COMMENT ON A BLOGPOST =======================
    .post( async (req, res, next) => {
        try {
            const data = await Comment.create({...req.body, blogPostId: req.params.postId })
            res.send(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

router.route('/:postId/:commentId')
   // ===============  RETRIEVES SINGLE COMMENT =======================
    .get( async (req, res, next) => {
        try {
            // const { postId, commentId } = req.params
            const data = await Comment.findByPk(req.params.commentId, {
                include: { model: Author, attributes: ['id', 'name', 'avatar']}
            })
            res.send(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
    // ===============  UPDATES A COMMENT =======================
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
    // ===============  DELETES A COMMENT =======================
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