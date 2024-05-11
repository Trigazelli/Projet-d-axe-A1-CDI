import express from "express"
import cors from "cors"
import router from "./router.js"
import bodyParser from "body-parser"
import ip from "ip"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const app = express()
const ipAddr = ip.address()


app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

app.get("/house",(req,res) => {
    prisma.house.findUnique({
        where : {
            id : 1,
        },
    })
    .then((e) => {
        res.json({"house":e.house})
    })
    .catch((error) => {
        res.json(error)
    })
})

app.post("/house",(req,res) => {
    prisma.house.update({
        where : {
            id : 1,
        },
        data: req.body
    })
    .then((e) => {
        res.json({"house":e.house})
    })
    .catch((error) => {
        res.json(error)
    })
})

app.use(router)






app.listen(3000, () => {
    console.log(`Server run: ${ipAddr}:3000`);
})