import express from "express"
import {sayHello, sayHelloInFrench} from "../controllers/HelloController.js"

const router = express.Router()

router.get('/', sayHello)
router.get('/french', sayHelloInFrench)

export default router