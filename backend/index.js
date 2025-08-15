const express = require('express')
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/userRouter')
const {connectToMongoDb} = require('./connect');
const app = express();

const cors = require('cors');

connectToMongoDb("mongodb://127.0.0.1:27017/skill-swap-platform")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

  //middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// routing
app.use('/api',userRouter)



const PORT = 8009;
app.listen(PORT,()=>{
    console.log(`backend server running on http://localhost:${PORT}`);
})