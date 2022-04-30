import * as service from './service.js'

export const create = async (req, res) => {
    const { ImageURL, content, viewers, viewersCount } = req.body
    const expireDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
    const story = await service.create({ ImageURL, content, viewers, viewersCount, user_id: req.userId, expireDate })
    res.status(201).send(story)
}

export const addViewer = async (req, res) => {
    const story_id = req.params.id
    const story = await service.viewStory({ story_id, user_id: req.userId })
    return res.send(story)
}

export const remove = async (req, res) => {
    const result = await service.removeStory({ storyId: req.params.id, userId: req.userId })
    if (!result) throw new Error(`No story found for ${req.params.id}`)
    return res.status(204).send(result)
}

export const findStory = async (req, res) => {
    const { page = 1, size = 10, keySearch } = req.query;
    const result = await service.findStory({ page, size, keySearch })
    return res.status(200).send(result)
}
