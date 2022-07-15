const Post = require("../../model/post/Post");
const expressAsyncHandler = require("express-async-handler");
const validateMongodbID = require("../../utils/validateMongodbID");
const Filter = require("bad-words");
const User = require("../../model/user/User");
const { cloudinaryUploadPostImages } = require("../../utils/cloudinary");

const createPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.user;
  validateMongodbID(id);
  const filter = new Filter();
  const isProfane = filter.isProfane(req?.body?.title, req?.body?.description);
  if (isProfane) {
    // Block the user
    await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    throw new Error(
      "Post create failed because your post contains profane words and that's why you are blocked!"
    );
  }
  const localPath = `public/images/posts/${req?.file?.filename}`;
  const imageUploaded = await cloudinaryUploadPostImages(localPath);

  try {
    const post = await Post.create({
      ...req?.body,
      image: imageUploaded?.url,
      user: id,
    });
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// fetch all the post
const fetchPostsCtrl = expressAsyncHandler(async (req, res) => {
  const hasCategory = req?.query?.category;
  try {
    if (hasCategory) {
      const posts = await Post.find({ category: hasCategory })
        .populate("user")
        .populate("comments")
        .sort({ createdAt: -1 });
      res.json(posts);
    } else {
      const posts = await Post.find()
        .populate("user")
        .populate("comments")
        .sort({ createdAt: -1 });
      res.json(posts);
    }
  } catch (error) {
    res.json(error);
  }
});

// fetch post details
const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const post = await Post.findById(id)
      .populate("user")
      .populate("likes")
      .populate("dislikes")
      .populate("comments");
    // Increment post views
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { numOfViews: 1 },
      },
      {
        new: true,
      }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// UPDATE POST CTRL
const updatePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  validateMongodbID(id);
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        ...req?.body,
        user: req?.user.id,
      },
      {
        new: true,
      }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// DELETE POST
const deletePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  validateMongodbID(id);
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    res.json(deletedPost);
  } catch (error) {
    res.json(error);
  }
});

// Add likes to post ctrl
const toggleLikesToPostCtrl = expressAsyncHandler(async (req, res) => {
  // find the post which I have to liked
  const { postId } = req?.body;
  validateMongodbID(postId);
  let post;
  post = await Post.findById(postId);
  // Find the user
  const loginUserId = req?.user?.id;
  // check wheather the user liked the post or not
  const isLiked = post?.isLiked;
  // Check wheather this user already dislike this post or not
  const alreadyDisliked = post?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  try {
    // remove user from the dislikes array if already disliked by the user
    if (alreadyDisliked) {
      post = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        {
          new: true,
        }
      );
    }
    // Check if the user already liked the post
    if (isLiked) {
      post = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        {
          new: true,
        }
      );
    } else {
      post = await Post.findByIdAndUpdate(
        postId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        {
          new: true,
        }
      );
    }
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// Dislike post ctrl
const dislikePostTogglerCtrl = expressAsyncHandler(async (req, res) => {
  // 1. Find the post to dislike
  const { postId } = req?.body;
  validateMongodbID(postId);
  let post;
  post = await Post.findById(postId);
  // 2. Find the user
  const loginUserId = req?.user?.id;
  // 3. Check wheather the post already disliked or not?
  const isDisliked = post?.isDisliked;
  // check the user already liked the post or not
  const alreadyLiked = post?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );

  try {
    // if the post is already liked by user remove the user
    if (alreadyLiked) {
      post = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        {
          new: true,
        }
      );
    }
    // Check dislike status
    if (isDisliked) {
      post = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        {
          new: true,
        }
      );
    } else {
      // dislike the post
      post = await Post.findByIdAndUpdate(
        postId,
        {
          $push: { dislikes: loginUserId },
          isDisliked: true,
        },
        {
          new: true,
        }
      );
    }
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createPostCtrl,
  fetchPostsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  toggleLikesToPostCtrl,
  dislikePostTogglerCtrl,
};
