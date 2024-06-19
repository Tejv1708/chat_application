import express from 'express'
import { generatedId } from '../controller/FriendConversationController.js'

const router = express.Router()
router.post( '/', generatedId )

export default router
