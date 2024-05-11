import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getProfile = async(req, res) => {
    const token = req.headers["x-access-token"]

    if (!token) {
        return res.status(401).json({error: "no token provided"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({error:"Unauthorized"})
        }

        prisma.user.findUnique({
            where: {
                id: decoded.id,
            },

            include: {
                agent: true,
            },
        })
        .then((user) => {
            res.json(user)
            console.log(user);
        })
        .catch((error) => {
            res.json(error)
        })
    })
}

const addFav = async(req, res) => {
    const token = req.headers['x-access-token']

    if (!token) {
        return res.status('401').json({error: "no token provided"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({error : "unauthorized"})
        }
    })

    prisma.user.update({
        where: {
            id: decoded.id,
        },
        data: {
            agentId: Number(req.body.agent),
        },
    })

    .then((user) => {
        res.json(user)
    })
    .then((error) => {
        res.json(error)
    })
}

export {
    getProfile,
    addFav
}