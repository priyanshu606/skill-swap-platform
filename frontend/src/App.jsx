import { Route,  Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import UserProfile from "./component/UserProfile"
import UsersProfile from "./component/UsersProfile"
import SubmitRequest from "./component/SubmitRequest"

function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element= {<HomePage/>}/> 
      <Route path="/profile" element= {<UserProfile/>}/> 
      <Route path="/user/:userId" element={<UsersProfile/>} />
      <Route path="/user/request/:id" element={<SubmitRequest/>} />
    </Routes>
    </>
  )
}

export default App
