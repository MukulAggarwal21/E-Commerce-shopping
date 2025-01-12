  const User = require("../models/userDB.js");
  const jwt = require("jsonwebtoken");

  function generateAccessToken(user) {
    console.log(process.env.ACCESS_TOKEN_SECRET); // Check if it's being read correctly
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  }
  

  const signinValidation = async (req, res) => {
    const { email, secret } = req.body;

    try {
      const foundUser = await User.findAndValidate(email, secret);
      if (foundUser) {
        const accessToken = generateAccessToken({ email: foundUser.email });
        const id = foundUser._id;
        res.json({ id, accessToken });
      } else {
        res.status(401).json("Authentication failed");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Something went wrong");
    }
  };

  module.exports = signinValidation;
