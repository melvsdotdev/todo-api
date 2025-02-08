import express from 'express'
import { db } from './config/database.js'

const app = express()
const port = 9000

app.use(express.json())

app.get('/', (request, response) => {
  response.send({
    title: 'TODO API',
    description: 'A simple CRUD API made using Express.js and Turso',
    author: 'Melvin Morato Borja',
    website: 'https://melvs.dev'
  })
})

app.post('/todos', async (request, response) => {
  try {
    const { title, description } = request.body

    if (title) {
      const query = await db.execute({
        sql: 'INSERT INTO todos (title, description) VALUES(?, ?)',
        args: [title, description ? description : null]
      })

      if (query.rowsAffected) {
        response.send({ data: "Todo item has been added" })
      } else {
        response.status(400).send({ data: "Failed to add todo item" })
      }
    } else {
      response.status(422).send({ data: "Title is required" })
    }
  } catch (error) {
    response.status(500).send({ data: 'Server error' })
  }
})

app.get('/todos', async (request, response) => {
  try {
    const query = await db.execute('SELECT * FROM todos')

    response.send({ data: query.rows })
  } catch (error) {
    response.status(500).send({ data: 'Server error' })
  }
})

app.get('/todos/:id([0-9]+)', async (request, response) => {
  try {
    const { id } = request.params

    const query = await db.execute({
      sql: 'SELECT * FROM todos WHERE id=?',
      args: [id]
    })

    response.send({ data: query.rows[0] ? query.rows[0] : null })
  } catch (error) {
    response.status(500).send({ data: 'Server error' })
  }
})

app.put('/todos/:id([0-9]+)', async (request, response) => {
  try {
    const { id } = request.params
    const { title, description } = request.body

    if (title) {
      const query = await db.execute({
        sql: 'UPDATE todos SET title=?, description=? WHERE id=?',
        args: [title, description ? description : null, id]
      })

      if (query.rowsAffected) {
        response.send({ data: "Todo item has been updated" })
      } else {
        response.status(400).send({ data: "Failed to update todo item" })
      }
    } else {
      response.status(422).send({ data: "Title is required" })
    }
  } catch (error) {
    response.status(500).send({ data: 'Server error' })
  }
})

app.delete('/todos/:id([0-9]+)', async (request, response) => {
  try {
    const { id } = request.params
    
    const query = await db.execute({
      sql: 'DELETE FROM todos WHERE id=?',
      args: [id]
    })

    if (query.rowsAffected) {
      response.send({ data: "Todo item has been deleted" })
    } else {
      response.status(400).send({ data: "Failed to delete todo item" })
    }
  } catch (error) {
    response.status(500).send({ data: 'Server error' })
  }
})

app.listen(port, () => {
  console.log(`TODO API is being served at http://localhost:${port}`)
})