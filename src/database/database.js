import fs from 'node:fs/promises';

const databasePath = new URL('./database.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8')
        .then(data => {
            this.#database = JSON.parse(data)
        })
        .catch( data => {
            this.#persist()
        })
    }
    test(item) {
        console.log(item)
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select( table ,search ) {
        let data = this.#database[table] ?? []
        
        if(search) {
            data = data.filter( row => {
                return Object.entries(search).some(([key, valuie]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }
    }
    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist();

        return data
    }
    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex( row => row.id === id );

        if(rowIndex > -1) {
            this.#database[table][rowIndex]= { id, ...data };
            this.#persist();
        }
    }
    delete(table, id) {
        const rowIndex = this.#database[table].finIndex( row => row.id === id);

        if(rowIndex > -1) {
            this.#database[table][rowIndex].splice(rowIndex, 1)
            this.#persist()
        }
    }
}