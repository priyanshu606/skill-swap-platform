const User = require("../model/signupUser");
const { createToken } = require("../service/auth");
const bcrypt = require("bcrypt");

async function handleSignupUser(req, res) {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    res.status(400).json({ msg: "all field are required" });
  }

  try {
    const result = await User.create({
      fullName,
      email,
      password,
    });

    return res.status(201).json({ msg: "success", id: result._id });
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(500).json({ msg: "Server error" });
  }
}

async function handleLoginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "user not find" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ msg: "Wrong password" });

  const token = await createToken(user);
  res.cookie("skillSwapToken", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  }); // store in browser

   res.json({
    msg: "Login successful",
    token,
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
}

module.exports = {
    handleSignupUser,
    handleLoginUser
}
