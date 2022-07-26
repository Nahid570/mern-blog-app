const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET_KEY}`,
});

const cloudinaryUploadProfileImages = async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      folder: "mern-blog-app/profile",
    });
    fs.unlink(fileToUpload, (err) => {
      if (err) throw new Error(err.message);
      return;
    });
    return {
      url: data?.secure_url,
    };
  } catch (error) {
    fs.unlink(fileToUpload, (err) => {
      if (err) throw new Error(err.message);
      return;
    });
    return error;
  }
};

const cloudinaryUploadPostImages = async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      folder: "mern-blog-app/posts",
    });
    fs.unlink(fileToUpload, (err) => {
      if (err) throw new Error(err.message);
      return;
    });
    return {
      url: data?.secure_url,
    };
  } catch (error) {
    return error;
  }
};

module.exports = { cloudinaryUploadProfileImages, cloudinaryUploadPostImages };
