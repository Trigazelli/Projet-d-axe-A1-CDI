import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

const signUp = async (req, res) => {
    const {email, pseudo, password } = req.body
    console.log(req.body);

    const hashedPassword = await bcrypt.hash(password, 10)

    prisma.user.create({
        data: {
            email,
            pseudo,
            password: hashedPassword,
        },
    })
    .then((user) => {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        })

    res.json(token)
    })
    .catch((error) => {
        res.status(400).json({error})
    })
}

const login = async(req, res) => {
    console.log("truc");
    const {email, password} = req.body

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })
    console.log("après user");
    console.log(user);

    if (!user) {
        return res.status(404).json({error: "User not found"})
    }

    console.log("oskour");

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
        console.log("if password");
        return res.status(404).json({error : "Password not valid"})
    }
    console.log(user.id, user.email);
    const token = jwt.sign({id: user.id, email :user.email }, `${process.env.JWT_SECRET}`, {
        expiresIn: "2h",
    })

    res.json(token)
}

export {
    signUp,
    login,
}