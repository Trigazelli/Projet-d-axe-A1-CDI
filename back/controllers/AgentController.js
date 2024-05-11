import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getAgents = (req, res) => {
    prisma.agent.findMany()
    .then((agents) => {
        res.json(agents)
    })
    .catch((error) => {
        res.json(error)
    })
}

const getAgent = (req, res) => {
    let id = Number(req.params.id)
    prisma.agent.findUnique({
        where : {
            id : id,
        },
    })

    .then((agent) => {
        res.json(agent)
    })
    .catch((error) => {
        res.json(error)
    })
}

const createAgent = (req, res) => {
    console.log("post")
    console.log(req.body)
    let agent = req.body
    console.log(agent.name);
    prisma.agent.create({
        data: {
            name : agent.name,
        }
    })
    .then((agent) => {
        res.json(agent)
    })

    .catch((error) => {
        res.json(error)
    })
}

const updateAgent = (req,res) => {
    let id = Number(req.params.id)
    let agent = req.body

    prisma.agent.update({
        where: {
            id: id
        },
        data: {
            name: agent.name
        }
    })
    .then((agent) => {
        res.json(agent)
    })
    .catch((error) => {
        res.json(error)
    })
}

const deleteAgent = (req, res) => {
    let id = Number(req.params.id)


    prisma.agent.delete({
        where: {
            id: id
        },
    })

    .then((agent) => {
        res.json(agent)
    })

    .catch((error) => {
        res.json(error)
    })
}

export {
    getAgents,
    getAgent,
    createAgent,
    updateAgent,
    deleteAgent
}