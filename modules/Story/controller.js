import { Result } from "express-validator";
import * as service from "./service.js";

export const postStory = async (req, res) => {
  const { Image, title, text } = req.body;
  const { fullName } = req;
  const post = await service.postStory({
    Image,
    title,
    text,
    user_id: req.userId,
    fullName,
  });
  res.status(201).send(post);
};

export const viewStory = async (req, res, next) => {
  const storyID = req.params._id;
  const { userId } = req;

  const view = await service
    .viewStory({ storyID, userId })
    .then((Result) => res.send(Result))
    .catch((err) => res.send(err));
};

export const deleteStory = async (req, res) => {
  const storyID = req.params._id;
  const { userId } = req;
  const deletion = await service
    .deleteStory({ storyID, userId })
    .then((Result) => res.send(Result));
};

export const  searchStory= async (req, res)=>{
  const {search}=req.body
  const find =await service.searchStory({search})
  res.send(find)

}