import { randomUUID } from 'node:crypto'
import { Database } from "../database/database.js";
import { buildRoutePath } from '../utils/build-route-path.js'

const database = new Database;

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query;

            const tasks = database.select('tasks', search ? {
                title: search,
                description: search
            } : null )

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body;
            const create = new Date();

            if(!title){
                return res.writeHead(404).end('title are mandatory')
            }
            if(!description){
                return res.writeHead(404).end('description are mandatory')
            }
            const note = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: create,
                updated_at: null
            }
    
            database.insert('tasks', note)
            
            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { title, description } = req.body;
            const [ task ] = database.select('/tasks', { id })

            if(!task) {
                return res.writeHead(404).end('id not found')
            }

            if(!title){
                return res.writeHead(404).end('title are mandatory')
            }
            if(!description){
                return res.writeHead(404).end('description are mandatory')
            }

            database.update('tasks', id, {
                title,
                description,
                updated_at: new Date(),
            }) 
            
            return res.writeHead(204).end()
    }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const [ task ] = database.select('/tasks', { id })

            if(!task) {
                return res.writeHead(404).end('id not found')
            }
            database.delete('tasks', id, res)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params;
            const [ task ] = database.select('/tasks', { id })

            if(!task) {
                return res.writeHead(404).end('id not found')
            }

            database.update('tasks', id, {
                completed_at: new Date(),
            })

            return res.writeHead(204).end()
            
        }
    }
]