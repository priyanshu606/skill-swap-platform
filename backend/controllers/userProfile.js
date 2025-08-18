const User = require('../model/signupUser');

async function handleUpdateUser(req, res) {
  const userId = req.params.id;
  const updateData = { ...req.body };

  if (req.file) {
    updateData.profilePhoto = `/uploads/${req.file.filename}`;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}

async function handleGetUser(req, res) {
  const userId = req.params.id;

  try {
    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

module.exports = {
  handleUpdateUser,
  handleGetUser
};
