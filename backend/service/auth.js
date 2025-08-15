const jwt = require('jsonwebtoken')
const SECRET_KEY = "namastedosto"
 function createToken(user) {
   return  jwt.sign(
        {_id:user._id,email:user.email},
        SECRET_KEY,
        {expiresIn: '1d'}
    );
}

 function verifyToken(token) {
    if(!token) return null;
    try {
        return jwt.verify(token,SECRET_KEY);
    } catch (error) {
        return null;
    }
}

module.exports = { createToken, verifyToken };