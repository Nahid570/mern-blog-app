const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db/dbConnect");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const userRouter = require("./route/user/usersRoute");
const postRoutes = require("./route/posts/postsRoute");
const commentRouter = require("./route/comment/commentRoutes");
const sendMailRouter = require("./route/sendEmail/sendEmailMsg");
const categoryRouter = require("./route/category/categoryRoutes");

require("dotenv").config();

const app = express();
app.use(cors());

// MongoDB Connection
dbConnect();

// Middleware
app.use(express.json());

// users router
app.use("/api/users", userRouter);
// posts routes
app.use("/api/posts", postRoutes);
// comments routes
app.use("/api/comments", commentRouter);
// sending mail
app.use("/api/email", sendMailRouter);
// category routes
app.use("/api/category", categoryRouter);

// error handler
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
