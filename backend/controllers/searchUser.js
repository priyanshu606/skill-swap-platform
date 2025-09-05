const User = require("../model/signupUser");

async function handleSearchUser(req, res) {
  try {
    const { skill } = req.query;
    
    if (!skill) {
      return res.status(400).json({ message: "Skill is required" });
    }

    const query = {
      $or: [
        { skillsOffered: { $regex: skill, $options: "i" } },
        { skillsWanted: { $regex: skill, $options: "i" } }
      ]
    };

    const users = await User.find(query);
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { handleSearchUser };
