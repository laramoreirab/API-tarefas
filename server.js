const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
const rotasTarefas = require('./rotas/rotasTarefas')
const logger = require('./middlewares/logger')

app.use(logger)

app.use(express.json()) // middleware para ler arquivo json

app.use('/tarefas', rotasTarefas)

app.get('/', (req, res) => {
    res.status(200).send('Página Inicial')
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
