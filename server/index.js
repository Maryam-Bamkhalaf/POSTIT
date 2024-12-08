import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import bcrypt from "bcrypt";
import PostModel from "./Models/PostModel.js";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";
import * as ENV from "./config.js";

const app = express();
app.use(express.json());
app.use(cors());
//Database connection
const connectString = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=${ENV.DB_APP_NAME}`;
mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const __filename = fileURLToPath(import.meta.url);

// Get the directory name from the current file path
const __dirname = dirname(__filename);

// Set up middleware to serve static files from the 'uploads' directory
// Requests to '/uploads' will serve files from the local 'uploads' folder
app.use("/uploads", express.static(__dirname + "/uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the directory to save uploaded files
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

// Create multer instance

const upload = multer({ storage: storage });

/*......API code register...........*/
app.post("/registerUser", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hashedpassword = await bcrypt.hash(password, 10);

    //Assign the values from the request body to the Model
    const user = UserModel({
      name: name,
      email: email,
      password: hashedpassword,
    });

    await user.save();
    res.send({
      user: user,
      msg: "Added.",
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.delete("/deleteUser", async (req, res) => {});

app.get("/viewUser", async (req, res) => {});

/*......API code Login...........*/
app.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body; //using destructuring
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(500).json({ error: "User not found." });
    }
    console.log(user);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "password failed" });
    }
    res.status(200).json({ user, message: "Success." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*......API code LoginOut...........*/
app.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

//POST API - savePost

app.post("/savePost", async (req, res) => {
  try {
    const postMsg = req.body.postMsg;

    const email = req.body.email;

    const post = new PostModel({
      postMsg: postMsg,
      email: email,
    });

    await post.save();

    res.send({ post: post, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
//GET API - getPost

app.get("/getPosts", async (req, res) => {
  try {
    // Fetch all posts from the "PostModel" collection, sorted by createdAt in descending order

    const posts = await PostModel.find({}).sort({ createdAt: -1 });

    const countPost = await PostModel.countDocuments({});

    res.send({ posts: posts, count: countPost });
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "An error occurred" });
  }
});

/*Like and Dislike API*/
app.put("/likePost/:postId/", async (req, res) => {
  const postId = req.params.postId; //Extract the ID of the post from the URL
  const userId = req.body.userId;

  try {
    const postToUpdate = await PostModel.findOne({ _id: postId });

    if (!postToUpdate) {
      return res.status(404).json({ msg: "Post not found." });
    }

    //Search the user Id from the array of users who liked the post.

    const userIndex = postToUpdate.likes.users.indexOf(userId);

    //indexOf method returns the index of the first occurrence of a specified value in an array.

    //If the value is not found, it returns -1.

    //This code will toogle from like to unlike

    if (userIndex !== -1) {
      // User has already liked the post, so unlike it

      const udpatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },

        {
          $inc: { "likes.count": -1 }, // Decrement the like count $inc and $pull are update operators

          $pull: { "likes.users": userId }, // Remove userId from the users array
        },

        { new: true } // Return the modified document
      );

      res.json({ post: udpatedPost, msg: "Post unliked." });
    } else {
      // User hasn't liked the post, so like it

      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },

        {
          $inc: { "likes.count": 1 }, // Increment the like count

          $addToSet: { "likes.users": userId }, // Add userId to the users array if not already present
        },

        { new: true } // Return the modified document
      );

      res.json({ post: updatedPost, msg: "Post liked." });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "An error occurred" });
  }
});

/*update API*/
app.put(
  "/updateUserProfile/:email/",
  upload.single("profilePic"),
  async (req, res) => {
    //Retrieve the value from the route
    const email = req.params.email;
    const name = req.body.name;
    const password = req.body.password;

    try {
      // Search for the user that will be updated using the findOne method
      const userToUpdate = await UserModel.findOne({ email: email });

      // Check if the user was found
      if (!userToUpdate) {
        return res.status(404).json({ error: "User not found" });
      }
      let profilePic = null;
      if (req.file) {
        profilePic = req.file.filename; // Filename of uploaded file
        // Update profile picture if a new one was uploaded but delete first the old image
        if (userToUpdate.profilePic) {
          const oldFilePath = path.join(
            __dirname,
            "uploads",
            userToUpdate.profilePic
          );
          fs.unlink(oldFilePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("Old file deleted successfully");
            }
          });
          userToUpdate.profilePic = profilePic; // Set new profile picture path
        }
      } else {
        console.log("No file uploaded");
      }

      // Update user's name
      userToUpdate.name = name;

      // Hash the new password and update if it has changed
      if (password !== userToUpdate.password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        userToUpdate.password = hashedPassword;
      } else {
        userToUpdate.password = password; // Keep the same password if unchanged
      }

      // Save the updated user information to the database
      await userToUpdate.save();

      // Send the updated user data and a success message as a response
      res.send({ user: userToUpdate, msg: "Updated." });
    } catch (err) {
      // Handle any errors during the update process
      res.status(500).json({ error: err.message });
    }
  }
);
app.get("/getUsers", async (req, res) => {
  try {
    // Fetch all users from the "UserModel" collection, sorted by name in descending order

    const users = await UserModel.find({}).sort({ name: 1 });

    const userPost = await UserModel.countDocuments({});

    res.send({ users: users, count: userPost });
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "An error occurred" });
  }
});

const port = ENV.PORT || 3001;
app.listen(port, () => {
  console.log(`You are connected at port: ${port}`);
});
