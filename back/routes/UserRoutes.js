import express from "express"
import {getProfile, addFav} from "../controllers/UserController.js"

const router = express.Router()

router.get("/", getProfile)
router.post("/favorite", addFav)

export default router