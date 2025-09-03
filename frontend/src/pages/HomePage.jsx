import Navebar from "../component/Navbar";
import Filter from "../component/Filter";
import UserList from "../component/UserList";
import { useContext, useState } from "react";
import LoginPopup from "../component/LoginPopup";
import SignUpPopup from "../component/SignUpPopup";
import UserMenu from "../component/UserMenu";
import PendingPage from "../component/PendingPage";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState("availability");
  const { showPopup, signUpPopup} =useContext(AuthContext);

  return (
    <div>
      <Navebar />
      <Filter
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
      />
      {selectedOption == "availability" ? <UserList /> : <PendingPage />}
      {showPopup && (
        <LoginPopup/>
      )}
      {signUpPopup && (
        <SignUpPopup/>
      )}
      <UserMenu />
    </div>
  );
};

export default HomePage;
