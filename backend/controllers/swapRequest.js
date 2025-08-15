const SwapRequest = require("../model/swapRequest");

async function handleSwapRequest(req, res) {
  const { to, offeredSkill, wantedSkill, message } = req.body;
  const from = req.user._id; 

  try {
    const newRequest = await SwapRequest.create({
      from,
      to,
      offeredSkill,
      wantedSkill,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Swap request sent",
      data: newRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send request",
      error: error.message,
    });
  }
}


async function getAllSendRequest(req,res) {
  try {
    
   const allSendRequest = await SwapRequest.find({ from: req.user._id }).
      populate('to',"fullName profilePhoto")
      .sort({ createdAt: -1 });
     res.status(200).json({
        success: true,
        message: "allSendRequest fetched successfully",
        allSendRequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
  
} 

module.exports = { handleSwapRequest ,getAllSendRequest};
