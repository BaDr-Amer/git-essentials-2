import Story from '../models/Story.js'

export default async (req, res, next) => {
    const storyId = req.params.id
    const storyCreatorId = await Story.findById(storyId, 'storyCreator').exec()?.user_id;
    const userId = req.userId;
    if (!userId.toString() === storyCreatorId) return res.status(403).json({
        message: 'You don’t have permission'
    })
    else {
        next()
    }

}