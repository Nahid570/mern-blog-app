const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  fetchUsersCtrl,
  deleteUserCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  userProfileUpdateCtrl,
  updateUserPasswordCtrl,
  followingUserCtrl,
  unfollowUserCtrl,
  blockUserCtrl,
  unblockUserCtrl,
  generateVerificationTokenCtrl,
  accountVerificationStatusCtrl,
  forgetPasswordTokenCtrl,
  resetPasswordCtrl,
  uploadProfilePhotoCtrl,
} = require("../../controllers/users/userCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {
  photoUpload,
  profilePhotoResize,
} = require("../../middlewares/upload/PhotoUpload");
const userRouter = express.Router();

// register user
userRouter.post("/register", userRegisterCtrl);
// login user
userRouter.post("/login", userLoginCtrl);
// fetch all the users
userRouter.get("/", authMiddleware, fetchUsersCtrl);
// update user password
userRouter.put("/password", authMiddleware, updateUserPasswordCtrl);
// fetch user profile
userRouter.get("/profile/:id", authMiddleware, userProfileCtrl);
// follow a user
userRouter.put("/follow", authMiddleware, followingUserCtrl);
// Unfollow a user
userRouter.put("/unfollow", authMiddleware, unfollowUserCtrl);
// Block a user -> ADMIN
userRouter.put("/block-user/:id", authMiddleware, blockUserCtrl);
// UnBlock a user -> ADMIN
userRouter.put("/unblock-user/:id", authMiddleware, unblockUserCtrl);
// send email verification link along with token
userRouter.post(
  "/generate-verify-email-token",
  authMiddleware,
  generateVerificationTokenCtrl
);
// reset password
userRouter.put("/reset-password", resetPasswordCtrl);
// user account verification
userRouter.put(
  "/verify-account",
  authMiddleware,
  accountVerificationStatusCtrl
);
// forget password token
userRouter.post("/forget-password-token", forgetPasswordTokenCtrl);
// upload profile photo
userRouter.put(
  "/profile-photo-upload",
  authMiddleware,
  photoUpload.single("image"),
  profilePhotoResize,
  uploadProfilePhotoCtrl
);
// user profile update
userRouter.put("/:id", authMiddleware, userProfileUpdateCtrl);
// delete user
userRouter.delete("/:id", deleteUserCtrl);
// fetch single user details
userRouter.get("/:id", fetchUserDetailsCtrl);

module.exports = userRouter;
