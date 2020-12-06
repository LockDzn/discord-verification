import express from 'express'

import AuthController from './controllers/AuthController'

const authController = new AuthController()

const routes = express.Router()

routes.get('/auth', authController.index)

export default routes