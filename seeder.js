import fs from 'fs/promises'// use promises version not callbacks version
import path from 'path'
import connect from './core/db.js'
import { exit } from 'process'
import { pathToFileURL } from 'url'
import Lookup from './models/Lookup.js'

const __dirname = path.resolve()

connect().then(async () => {
    const files = await fs.readdir(path.join(__dirname, '/seed/'))
    for await (const file of files) {
        if (file.endsWith('.js')) {
            const isExist = await Lookup.findOne().exec();
            if (!isExist) {
                const seed = await import(pathToFileURL(path.join(__dirname, `/seed/${file}`)).toString())
                await seed.default()
            }
        }
    }
    console.log('Done!')
    exit(0)
}).catch(err => {
    console.log(err)
})