import Navebar from '../component/Navbar'
import Filter from '../component/Filter'
import UserList from '../component/UserList'
import { useState } from 'react'
import LoginPopup from '../component/LoginPopup'
import SignUpPopup from '../component/SignUpPopup'
import UserMenu from '../component/UserMenu'
import PendingList from '../component/PendingList'

const HomePage = () => {
      const [showPopup, setShowPopup] = useState(false);
      const [signUpPopup,setSignUpPopup] = useState(false);
      const [selectedOption, setSelectedOption] = useState('availability');
  return (
    <div>
      <Navebar onLoginClose = {()=>{setShowPopup(true)}}/>
      <Filter setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
     {selectedOption=='availability' ? <UserList/> : <PendingList/>} 
       {showPopup && <LoginPopup onClose={()=>{setShowPopup(false)}} 
        openSignUp={()=>{
            setSignUpPopup(true);
            setShowPopup(false)}} />}
        {signUpPopup && <SignUpPopup onClose={()=>{setSignUpPopup(false)}}
         openLogin={() => {
          setSignUpPopup(false);
          setShowPopup(true);
        }}/>}
        <UserMenu/>
        
    </div>
  )
}

export default HomePage