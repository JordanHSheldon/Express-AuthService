// Importing modules
const express = require("express");
const mongoose = require('mongoose'), User = require('./userModel').User;
 
const jwt = require("jsonwebtoken");
 
const app = express();
const PORT = 3000;
app.use(express.json());
 
// Handling post request
app.post("/login", async (req, res, next) => {
  let { username, password } = req.body;
 
  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  if (!existingUser || existingUser.password != password) {
    const error = Error("Wrong details please check at once");
    return next(error);
  }
  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
 
  res
    .status(200)
    .json({
      success: true,
      data: {
        userId: existingUser.id,
        username: existingUser.username,
        token: token,
      },
    });
});
 
// Handling post request
app.post("/signup", async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = new User({
    name,
    email,
    password,
  });
 
  try {
    await newUser.save();
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  res
    .status(201)
    .json({
      success: true,
      data: { userId: newUser.id,
          email: newUser.email, token: token },
    });
});
 
//Connecting to the database
mongoose
  .connect("mongodb://0.0.0.0:27017/mydb")
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error Occurred", err);
  });