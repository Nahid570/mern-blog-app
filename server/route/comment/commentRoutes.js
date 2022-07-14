const express = require("express");
const {
  createCommentCtrl,
  fetchAllCommentsCtrl,
  fetchCommentDetails,
  updateCommentCtrl,
  deleteCommentCtrl,
} = require("../../controllers/comment/commentCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const commentRouter = express.Router();

commentRouter.post("/", authMiddleware, createCommentCtrl);
commentRouter.get("/", authMiddleware, fetchAllCommentsCtrl);
commentRouter.get("/:id", authMiddleware, fetchCommentDetails);
commentRouter.put("/:id", authMiddleware, updateCommentCtrl);
commentRouter.delete("/:id", authMiddleware, deleteCommentCtrl);

module.exports = commentRouter;
