import StoryViewer from "../../models/StoryViewer.js";
import mongoose from "mongoose";
import { ApiError } from "../../errors/ApiError.js";
import Story from "../../models/Story.js";
export const postStory = async ({ Image, title, text, user_id, fullName }) => {
  const expireDate = new Date().setDate(new Date().getDate() + 1);
  return await Story.create({
    Image,
    title,
    text,
    user_id,
    userName: fullName,
    expireAt: expireDate,
  });
};

export const viewStory = async ({ storyID, userId }) => {
  const session = await mongoose.startSession();
  let viewers;
  let insert;
  let update;
  let story;

  await session.withTransaction(async () => {
    story = await Story.findById(storyID);
    if (!story) throw ApiError.badRequest("wrong id");
    const { expireAt } = story;
    insert = await StoryViewer.updateOne(
      { story_id: storyID, user_id: userId },
      { $setOnInsert: { story_id: storyID, user_id: userId, expireAt } },
      { upsert: true }
    );
    if (insert.upsertedCount == 1)
      update = await Story.findOneAndUpdate(
        { _id: storyID },
        { $inc: { viewersCount: 1 } }
      );
  });
  let paginateViewers = await pagination(storyID);
  await session.endSession();
  return { story, paginateViewers, insert };
};

const pagination = async (storyID) => {
  const options = [
    { $match: { story_id: mongoose.Types.ObjectId(storyID) } },
    { $project: { user_id: 1 } },
    {
      $lookup: {
        from: "User",
        localField: "user_id",
        foreignField: "_id",
        as: "viewers",
      },
    },
    { $unwind: "$viewers" },
    { $project: { "viewers.fullName": 1 } },
  ];

  const aggregate = StoryViewer.aggregate(options);
  const paginate = await StoryViewer.aggregatePaginate(aggregate);

  return paginate;
};

export const deleteStory = async ({ storyID, userId }) => {
  const session = await mongoose.startSession();
  let Storydeletion, viewsDeletion;
  if (await !isAutharized(storyID, userId))
    throw ApiError.badRequest("not autharized");
  await session.withTransaction(async () => {
    Storydeletion = await Story.delete({ _id: storyID });
    if (Storydeletion.matchedCount==0) throw ApiError.badRequest("Story not exists");
    viewsDeletion = await StoryViewer.delete({ story_id: storyID });
  });
  await session.endSession();
  return { Storydeletion, viewsDeletion };
};

const isAutharized = async (storyID, userId) => {
  return await Story.findOne({ _id: storyID, user_id: userId });
};

export const searchStory = async ({search}) => {
return await Story.paginate({ $text: { $search: search } })


}