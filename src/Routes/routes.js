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

            console.log(req.params)

            database.update('tasks', id, {
                title,
                description,
                updated_at: new Date(),
            })
            
            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;

            database.delete('tasks', id)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params;

            database.update('tasks', id, {
                title,
                description,
                created_at,
                updated_at,
                completed_at: new Date(),
            })

            return res.writeHead(204).end()
            
        }
    }
]