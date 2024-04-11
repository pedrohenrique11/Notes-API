import { randomUUID } from 'node:crypto'
import { Database } from "../database/database.js";
import { buildRoutePath } from '../utils/build-route-path.js'

const database = new Database;

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/notes'),
        handler: (req, res) => {
            const { search } = req.query;

            const notes = database.select('notes', search ? {
                title: search,
                text: search
            } : null )

            return res.end(JSON.stringify(notes))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/notes'),
        handler: (req, res) => {
            const { title, text } = req.body;

            const note = {
                id: randomUUID(),
                title,
                text
            }

            database.insert('notes', note)
            
            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/notes/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { title, text } = req.body;

            database.update('notes', id, {
                title,
                text
            })
            
            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/notes/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            
            console.log(req.params)

            database.delete('notes', id)

            return res.writeHead(201).end()
        }
    }
]