import * as service from './service.js'

export const createImageStory = async (req, res) => {
    const { Image,title,text } = req.body
    const post = await service.createImageStory({ Image ,title,text, user_id: req.userId })
    res.status(201).send(post)
}

