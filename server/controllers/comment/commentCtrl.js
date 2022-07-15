const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comment/Comment");
const validateMongodbId = require("../../utils/validateMongodbID");

// Create Comment
const createCommentCtrl = expressAsyncHandler(async (req, res) => {
  // 1. get the user
  const user = req?.user;
  // 2. get the postId;
  const { postId, description } = req?.body;
  validateMongodbId(postId);
  try {
    const comment = await Comment.create({
      post: postId,
      user,
      description,
    });
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

// Fetch all the comments
const fetchAllCommentsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({}).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.json(error);
  }
});

// fetch comment details
const fetchCommentDetails = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const comment = await Comment.findById(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
 
});

// update a comment
const updateCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  validateMongodbId(id);
  try {
    const updateComment = await Comment.findByIdAndUpdate(
      id,
      {
        user: req?.user,
        description: req?.body?.description,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(updateComment);
  } catch (error) {
    res.json(error);
  }
});

// Delete comment ctrl
const deleteCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  validateMongodbId(id);
  try {
    const deleteComment = await Comment.findByIdAndDelete(id);
    res.json(deleteComment);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createCommentCtrl,
  fetchAllCommentsCtrl,
  fetchCommentDetails,
  updateCommentCtrl,
  deleteCommentCtrl,
};
