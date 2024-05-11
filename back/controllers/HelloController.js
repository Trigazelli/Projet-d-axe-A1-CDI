const sayHello = (req, res) => {
    res.send("Hello World")
}

const sayHelloInFrench = (req, res) => {
    res.send("Bonjour le Monde !")
}

export {
    sayHello,
    sayHelloInFrench
}