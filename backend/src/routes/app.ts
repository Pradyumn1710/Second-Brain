import express from 'express'
import { Router } from 'express'
import {user_auth} from '../routes/user/user_auth'

const router = Router()

//Import all other path that you wanted to use 

router.use('/user-auth',user_auth)

module.exports = {router}

