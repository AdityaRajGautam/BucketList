import express from 'express'
import { getUsers,signup,login } from '../controllers/users-controllers.js'

const router = express.Router()

router.route('/').get(getUsers)
router.route('/signup').post(signup)
router.route('/login').post(login)


export default router