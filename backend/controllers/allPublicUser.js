const User = require('../model/signupUser')
const mongoose = require('mongoose');
async function handleGetAllUser(req,res) {
    try {
        const publicUsers  = await User.find({
            isPublic:true
        });
        res.status(200).json({
        success: true,
        message: "Public profiles fetched successfully",
        users: publicUsers,
    });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

module.exports = {handleGetAllUser}