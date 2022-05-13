import { create, findById } from "../service.js"
import { connect } from '../../../core/mongoMemoryServer.js'

describe('author tests', () => {
    let author = null
    beforeAll(async () => {
        await connect()
    })

    it('create author', async () => {
        author = await create({
            first_Name: 'Rider',
            last_Name: 'Haggard',
            author_image: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRYjOFN01REQpUROnZRG5-tyZdw0MxDggBtDHh__CTTqnzQKMqCNl-km8EsvROG'
        })
        expect(author.first_Name).toBe('Rider')
        expect(author.last_Name).toBe('Haggard')
        expect(author.author_image).toBe('http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRYjOFN01REQpUROnZRG5-tyZdw0MxDggBtDHh__CTTqnzQKMqCNl-km8EsvROG')
    })

    it('find author by id', async () => {
        const db_author = await findById(author._id)
        expect(db_author.first_Name).toBe('Rider')
        expect(db_author.last_Name).toBe('Haggard')
        expect(db_author.author_image).toBe('http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRYjOFN01REQpUROnZRG5-tyZdw0MxDggBtDHh__CTTqnzQKMqCNl-km8EsvROG')
    })
})