import express from "express"
import agents from "./routes/AgentRoutes.js"
import hello from "./routes/HelloRoutes.js"
import auth from "./routes/AuthRoutes.js"
import user from "./routes/UserRoutes.js"

const router = express.Router()

router.use('/', hello)
router.use('/agents', agents)
router.use('/auth', auth)
router.use('/user', user)


export default router