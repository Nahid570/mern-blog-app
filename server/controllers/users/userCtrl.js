const User = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const validateMongodbID = require("../../utils/validateMongodbID");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");
const { cloudinaryUploadProfileImages } = require("../../utils/cloudinary");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// User Register Controller

const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req?.body?.email });
  if (userExists) throw new Error("User already exists");
  try {
    // Register User
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json({ user });
  } catch (error) {
    res.json(error.message);
  }
});

// User Login Controller
const userLoginCtrl = expressAsyncHandler(async (req, res) => {
  // check if user exists or not
  const userFound = await User.findOne({ email: req?.body?.email });

  if (userFound && (await userFound.isPasswordMatched(req?.body?.password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      isAccountVerified: userFound?.isAccountVerified,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error("Credential doesn't match");
  }
});

// Fetch all users
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    res.json(error);
  }
});

// Delete user controller
const deleteUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json({ deletedUser });
  } catch (error) {
    res.json(error);
  }
});

// Fetch user details controller
const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const user = await User.findById(id);
    res.json({ user });
  } catch (error) {
    res.json(error);
  }
});

// users profile controller
const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const user = await User.findById(id).populate("posts");
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

// User profile update controller
const userProfileUpdateCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  validateMongodbID(_id);

  try {
    const user = await User.findByIdAndUpdate(
      _id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        bio: req?.body?.bio,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

const updateUserPasswordCtrl = expressAsyncHandler(async (req, res) => {
  //destructure the login user
  const { id } = req.user;
  const { password } = req.body;
  validateMongodbID(id);
  //Find the user by _id
  const user = await User.findById(id);

  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.json(user);
  }
});

// user following controller
const followingUserCtrl = expressAsyncHandler(async (req, res) => {
  const { followId } = req?.body;
  const loginUserId = req?.user?.id;

  // find the target id and check login id already exists?
  const targetUser = await User.findById(followId);

  const alreadyFollowing = targetUser?.followers?.find(
    (user) => user.toString() === loginUserId.toString()
  );

  if (alreadyFollowing) throw new Error("You are already following this user!");

  // 1. find the user to follow and update it's followers field
  await User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: loginUserId },
      isFollowing: true,
    },
    {
      new: true,
    }
  );

  // 2. update login user following field
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    {
      new: true,
    }
  );

  res.json("You have successfully follow");
});

// user unfollow controller
const unfollowUserCtrl = expressAsyncHandler(async (req, res) => {
  const { unfollowId } = req?.body;
  const loginUserId = req?.user?.id;

  // Find the target user to unfollow and update followers field
  await User.findByIdAndUpdate(
    unfollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    {
      new: true,
    }
  );

  // update login user following field
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unfollowId },
    },
    {
      new: true,
    }
  );

  res.json("You have successfully unfollowed");
});

// Block a user-> this feature can only be used by admin
const blockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    {
      new: true,
    }
  );

  res.json(user);
});

// Unblock a user-> this can only perform by admin
const unblockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    {
      new: true,
    }
  );

  res.json(user);
});

// Generate Email Verification Token for User
const generateVerificationTokenCtrl = expressAsyncHandler(async (req, res) => {
  const loginUserId = req?.user?.id;

  const user = await User.findById(loginUserId);
  
  try {
    // generate account verification token
    const generateToken = await user?.createAccountVerificationToken();
    // save the user
    await user.save();
    const verifyURL = `If you were requested to verify your account, verify now within 10 minutes, otherwise ignore this message. <a href="http://localhost:3000/verify-account/${generateToken}" target="_blank">Click here to verify</a>`;
    const msg = {
      to: user?.email,
      from: "farajinahid2@gmail.com",
      subject: "Verify Your Blog App",
      html: verifyURL,
    };
    await sgMail.send(msg);
    res.json(verifyURL);
  } catch (error) {
    res.json(error);
  }
});

// Verify user account status => here we will re hash our raw token and compare it to the database token if it matched or not or expired!
const accountVerificationStatusCtrl = expressAsyncHandler(async (req, res) => {
  const { verificationToken } = req?.body;
 
  const hashedVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  // find this user using our verify token and update account status
  const foundUser = await User.findOne({
    accountVerificationToken: hashedVerificationToken,
    accountVerificationTokenExpires: { $gt: new Date() },
  });
  if (!foundUser) throw new Error("Token expired, try again later");
  // if there is no error update the account status in the database
  foundUser.isAccountVerified = true;
  foundUser.accountVerificationToken = undefined;
  foundUser.accountVerificationTokenExpires = undefined;
  await foundUser.save();
  res.json(foundUser);
});

// Generate forget password token
const forgetPasswordTokenCtrl = expressAsyncHandler(async (req, res) => {
  const { email } = req?.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  try {
    const resetToken = await user.createPasswordResetToken();
    // save the user to db
    await user.save();

    const resetURL = `If you were requested to reset your password, reset it now within 10 minutes, otherwise ignore this message. <a href="http://localhost:3000/reset-password/${resetToken}" target="_blank">Click here to reset...</a>`;
    const msg = {
      to: email,
      from: "farajinahid2@gmail.com",
      subject: "Reset Password",
      html: resetURL,
    };
    await sgMail.send(msg);
    res.send({
      msg: `A verification mail is sent to ${email}, reset your password within 10 minutes. ${resetURL}`,
    });
  } catch (error) {
    res.json(error);
  }
});

// Reset password
const resetPasswordCtrl = expressAsyncHandler(async (req, res) => {
  const { resetToken, password } = req?.body;
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // find this user using our reset token and update reset status
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token expired, try again later");
  // update user password
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save();
  res.json(user);
});

// Upload profile photo controller
const uploadProfilePhotoCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.user;
  const localPath = `public/images/profile/${req.file.filename}`;
  const imageUploaded = await cloudinaryUploadProfileImages(localPath);

  const foundUser = await User.findByIdAndUpdate(
    id,
    {
      profilePhoto: imageUploaded?.url,
    },
    {
      new: true,
    }
  );
  res.json(foundUser?.profilePhoto);
});

module.exports = {
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
};
