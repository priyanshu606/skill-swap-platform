const {verifyToken} = require('../service/auth')

function authMiddleware(req,res,next){
   const authHeader = req.headers.authorization;
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(' ')[1];
  const user = verifyToken(token);

  if (!user) {
    return res.status(401).json({ msg: "Unauthorized: Invalid token" });
  }

  req.user = user;
  next();
}

module.exports = {authMiddleware}