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
            //const { title, text } = req.body;

            const note = {
                id: randomUUID(),
                title: "title",
                text: "test text"
            }

            database.insert('notes', note)
            
            return res.writeHead(201).end()
        }
    }
]