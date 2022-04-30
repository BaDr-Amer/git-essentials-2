import Story from '../../models/Story.js'
import User from '../../models/User.js'
import View from '../../models/View.js'
import mongoose from 'mongoose'
import { ApiError } from '../../errors/ApiError.js'

const getstoryCreatorName = async (user_id) => {
  const userName = await User.findById(user_id, 'fullName').exec();
  return userName
}

export const isViewedBefore = async ({ story_id, user_id }) => {
  return await View.findOne({ story_id, user_id })
}

export const isStoryExist = async (story_id) => {
  return await Story.findById(story_id)
}

export const create = async ({ ImageURL, content, viewers, user_id, viewersCount, expireDate }) => {
  const userName = await getstoryCreatorName(user_id)
  return new Story({
    ImageURL, content, viewers, viewersCount, expireDate, storyCreator: {
      user_id: user_id,
      userName: userName?.fullName
    }
  }).save()

}



export const viewStory = async ({ story_id, user_id }) => {
  const isViewed = await isViewedBefore({ story_id, user_id })
  try {
    if (!isViewed) {
      const session = await mongoose.startSession()
      let viewer
      await session.withTransaction(async () => {
        viewer = await View.create([{ story_id, user_id }], { session })
        await Story.updateOne({ _id: story_id }, { $inc: { viewersCount: 1 } }, { session })
      })
      session.endSession()
      return viewer
    } else {
      throw ApiError.badRequest('This story is viewed before')
    }
  } catch (error) {
    console.log(error)
  }
}

export const removeStory = async ({ storyId, userId }) => {
  const isExist = await isStoryExist(storyId)
  try {
    if (isExist) {
      let story
      const session = await mongoose.startSession()
      await session.withTransaction(async () => {
        story = await Story.findOneWithDeleted({ _id: storyId, user_id: userId }).session(session)
        await View.deleteMany({ story_id: storyId }, { session })
      })
      session.endSession()
      return await story.delete()
    } else {
      throw ApiError.badRequest('stroy isn`t exist!')
    }
  } catch (error) {
    console.log(error)
  }
}



export const findStory = async ({ page, size, keySearch }) => {
  const stories = await Story.find({ $text: { $search: keySearch } }, { score: { $meta: "textScore" } })
    .limit(size * 1)
    .skip((page - 1) * size)
    .exec();

  const count = await Story.countDocuments();

  return {
    stories,
    totalPages: Math.ceil(count / size),
    currentPage: page
  }
}