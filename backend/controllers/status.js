const SwapRequest = require("../model/swapRequest");

async function handleStatus(req,res) {
    try {
         const {status} = req.body;
    if(!["accepted","rejected"].includes(status)){
        return res.status(400).json({msg:"invalid status"});
    }

    const reqest = await SwapRequest.findByIdAndUpdate(
        req.params.id,
        {status},
        {new:true},
    )
    if(!reqest){
        return res.status(404).json({ error: "Request not found" });
    }
     res.json(reqest);

    } catch (error) {
         console.error("Error updating request:", error);
    res.status(500).json({ error: "Server error" });
    }
   
}

module.exports = {handleStatus}