const express = require('express')
const fs = require('fs')
const router = express.Router()
const autenticacao = require('../middlewares/autenticacao')

router.use(autenticacao) // vai utilizar a autenticação para a pagina inteira

//pegando a tarefa por id - Visualizar tarefas
router.post('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    fs.readFile('./dados/tarefas.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao ler arquivo tarefas.json')
            return
        }
        try {
            const dataJson = JSON.parse(data)
            const dataFiltrada = dataJson.find(function (idTarefa) {
                return idTarefa.id == id
            })
            res.status(200).json(dataFiltrada)
        } catch (error) {
            res.status(500).send('Erro ao converter arquivo', error)
        }
    })
})

//adicionando nova tarefa 
router.post('/',(req,res)=>{
    fs.readFile('./dados/tarefas.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao ler arquivo tarefas.json')
            return
        }
        try {
            const dataJson = JSON.parse(data)
            const novaTarefa = req.body
            dataJson.push(novaTarefa)
            fs.writeFile('./dados/tarefas.json', JSON.stringify(dataJson,null,2),'utf8', err =>{
                res.status(500).send('Erro ao salvar arquivo!!')
                return
            })
            res.status(201).json('Arquivo salvo!!')
        } catch (error) {
            res.status(500).send('Erro ao converter arquivo', error)
        }
    })
})
// curl -X POST -H "authorization: segredo" -H "Content-Type: application/json" -d '{"id":7, "descricao":"Estudar Node.js","status":"pendente"}' http://localhost:3000/tarefas


//atualizando nova tarefa
router.put('/:id', (req,res)=>{
const id = parseInt(req.params.id)
const atualizacao = req.body
fs.readFile('./dados/tarefas.json', 'utf8',(err,data)=>{
        if(err){
            res.status(500).send('Erro ao ler arquivo livros.json')
            console.error('Erro ao ler arquivo: \n', err)
            return
        }
        try{
            const dataJson = JSON.parse(data)
            const index = dataJson.findIndex(function(tarefa){
                return tarefa.id === id
            })
            dataJson[index].descricao = atualizacao.descricao // altera a descricao da tarefa
            dataJson[index].id = atualizacao.id // altera o id da tarefa
            dataJson[index].status = atualizacao.status //altera o status da tarefa

            fs.writeFile('./dados/tarefas.json', JSON.stringify(dataJson,null,2),'utf8', err =>{
                res.status(500).send('Erro ao gravar arquivo!!')
                console.error('Erro ao gravar arquivo: \n', err)
                return
            })

            res.status(200).json("Arquivo Atualizado!")
        } catch(error){
            res.status(500).send('Erro ao converter arquivo', error)
        }
    })
})

//PATCH: curl -X PUT -H "authorization: segredo" -H "Content-Type: application/json" -d '{"id": 7}'  http://localhost:3000/tarefas/Idodarquivoquequeremosmudar

//deletando nova tarefa
router.delete('/:id', (req,res)=>{
const id = parseInt(req.params.id)
fs.readFile('./dados/tarefas.json', 'utf8',(err,data)=>{
        if(err){
            res.status(500).send('Erro ao ler arquivo livros.json')
            return
        }
        try{
            const dataJson = JSON.parse(data)
            const dataFiltrada = dataJson.find(function(idLivro){
                return idLivro.id === id
            })
            dataJson.splice(dataJson.indexOf(dataFiltrada), 1)   //podemos ter usado o filter tbm
            fs.writeFile('./dados/tarefas.json', JSON.stringify(dataJson,null,2),'utf8', err =>{
                res.status(500).send('Erro ao salvar arquivo!!')
                return
            })
            res.status(201).json('Objeto Deletado!!')
        } catch(error){
            res.status(500).send('Erro ao converter arquivo', error)
        }
    })
})

// curl -X DELETE -H "authorization: segredo" http://localhost:3000/tarefas/IDquequeremosretirar //testando

//options

router.options('/',(req,res)=>{
    res.header('Allow','POST','OPTIONS')
    res.status(204).send()
})

router.options('/:id', (req,res)=>{
    res.header('Allow','POST', 'DELETE', 'PUT', 'OPTIONS')
    res.status(204).send()
})

module.exports = router