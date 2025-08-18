import { Route,  Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import UsersProfile from "./component/UsersProfile"
import SubmitRequest from "./component/SubmitRequest"
import EditProfile from "./component/EditProfile"
import ViewProfile from "./component/ViewProfile"

function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element= {<HomePage/>}/> 
       <Route path="/edit-profile" element={<EditProfile/>} />
        <Route path="/view-profile" element={<ViewProfile/>} />
      <Route path="/user/:userId" element={<UsersProfile/>} />
      <Route path="/user/request/:id" element={<SubmitRequest/>} />
    </Routes>
    </>
  )
}

export default App
