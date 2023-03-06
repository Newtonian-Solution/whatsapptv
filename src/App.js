import { useContext,useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  
} from "react-router-dom";
import AddListing from "./app/dashboard/add-listing";
import Home from "./app/dashboard/home";
import SignIn from "./app/signin";
import { Loader } from "./components/loader";
import Nav from "./components/nav";
import VisibilityContext from "./provider/state-manager/visibilityProvider";
import UserContext from "./provider/state-manager/userProvider";
import Footer from "./components/footer";
import ViewListing from "./app/dashboard/view-listing";
import LegitTv from "./app/dashboard/legitTv";
import ScamTv from "./app/dashboard/scamTv";
import SearchTv from "./app/dashboard/searchedTv";
import { PopUps } from "./components/PopUps";
function App() {
  const {visibility} = useContext(VisibilityContext)
  const {recoverUserData,user:{profile,tokenExpire,token},logout} = useContext(UserContext)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
  recoverUserData()
},[])
// useEffect(() => {
//     if(token && new Date().getTime() > tokenExpire) {
//   };
//   checkExpiration();
// },[token,tokenExpire])

// useEffect(() => {
//   if(token) {
//    const tokenExpire = Number(localStorage.getItem('tokenExpire'));
//    const currentTime = new Date().getTime();

//    if(currentTime > tokenExpire) {
//     setIsExpired(true);
//     logout();
//    } else {
//     const timeLeft = (tokenExpire - currentTime) / 1000 /60 /60;
//     console.log(timeLeft)
//     setTimeout(() => {
      
//       setIsExpired(true);
//       logout();
//     },timeLeft)
//    }
//   }
// },[token])


  return (
    <>
    <PopUps />
      {/* {visibility.isLoading ? <Loader /> : null} */}
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/" index element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/add-listing" element={<AddListing />} />
          <Route path="/view-listing" element={<ViewListing />} />
          <Route path="/all-legit-tv" element={<LegitTv />} />
          <Route path="/all-scam-tv" element={<ScamTv />} />
          <Route path="/searched/:search" element={<SearchTv />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;