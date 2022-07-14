const express = require("express");
const {
  createPostCtrl,
  fetchPostsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  toggleLikesToPostCtrl,
  dislikePostTogglerCtrl,
} = require("../../controllers/post/postCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {
  photoUpload,
  postPhotoResize,
} = require("../../middlewares/upload/PhotoUpload");
const postRoutes = express.Router();

postRoutes.post(
  "/create-post",
  photoUpload.single("image"),
  postPhotoResize,
  authMiddleware,
  createPostCtrl
);
postRoutes.put("/likes", authMiddleware, toggleLikesToPostCtrl);
postRoutes.put("/dislikes", authMiddleware, dislikePostTogglerCtrl);
postRoutes.get("/", fetchPostsCtrl);
postRoutes.get("/:id", fetchPostCtrl);
postRoutes.put("/:id", authMiddleware, updatePostCtrl);
postRoutes.delete("/:id", authMiddleware, deletePostCtrl);

module.exports = postRoutes;
