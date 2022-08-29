import express from "express";

const app = express()
const port = 8080

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`We have lift off!! See you on port ${port}`)
})