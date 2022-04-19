import fs from 'fs/promises'// use promises version not callbacks version
import path from 'path'
import connect from './core/db.js'
import { exit } from 'process'

const __dirname = path.resolve()

connect().then(async () => {
    const files = await fs.readdir(path.join(__dirname, '/seed/'))
    for await (const file of files) {
        if (file.endsWith('.js')) {
            const seed = await import(path.join(__dirname, `/seed/${file}`))
            await seed.default()
        }
    }
    console.log('Done!')
    exit(0)
}).catch(err => {
    console.log(err)
})