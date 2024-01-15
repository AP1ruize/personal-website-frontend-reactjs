// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import SideNav from './SideNav';
import Header from './Header';
import ContentFrame from './ContentFrame';
import { Routes, Route } from 'react-router-dom';
// import {useNavigate} from "react-router-dom"
import ImgPage from './ImgPage';
import GalleryPage from './GalleryPage';
import LogIn from './LogIn';
import Career from './Career';
import LogOut from './LogOut';
import UploadImg from './UploadImg';
import PrivateGallery from './PrivateGallery';
import PrivateImg from './PrivateImg';
import SignUp from './SignUp';

function App() {

  const [isOpen, setIsOpen] = useState(false);
  // const [mainContent, setMainContent] =useState("Home");
  // const [email, setEmail] =useState("");
  // const [authToken, setAuthToken] =useState("");
  const [userInfo, setUserInfo]=useState(null);

  const toggleSideBar = ()=>{setIsOpen(!isOpen);};

  const toLogOut=()=>{setUserInfo(null);}

  // const navigate=useNavigate()

  return (
    // <Router>
      <div className="App">
        <SideNav isOpen={isOpen}  />
        <div className={isOpen ? "MainBody_open" : "MainBody"}>
          <Header onToggleSideBar={toggleSideBar} userInfo={userInfo} />

          
            <Routes>
              <Route path="/" element={<ContentFrame />} />
              <Route path="/gallery" element={<GalleryPage userInfo={userInfo} />} />
              <Route path='/img/:id' element={<ImgPage userInfo={userInfo} toLogOut={toLogOut}/>} />
              <Route path="/logIn" element={<LogIn setUserInfo={setUserInfo} />} />
              <Route path='/logOut' element={<LogOut setUserInfo={setUserInfo} toLogOut={toLogOut}/>} />
              <Route path='/career' element={<Career/>} />
              <Route path="/newImg" element={<UploadImg userInfo={userInfo}/>} />
              <Route path='/pvtGallery/pvt' element={<PrivateGallery userInfo={userInfo} mode={'pvt'} toLogOut={toLogOut}/>} />
              <Route path='/pvtGallery/pub' element={<PrivateGallery userInfo={userInfo} mode={'pub'} toLogOut={toLogOut}/>} />
              <Route path='/pvtGallery/all' element={<PrivateGallery userInfo={userInfo} mode={'all'} toLogOut={toLogOut}/>} />
              <Route path='/pvtImg/:id' element={<PrivateImg userInfo={userInfo} toLogOut={toLogOut}/>} />
              <Route path='/signUp' element={<SignUp />} />
            </Routes>
          
        </div>
      </div>
      // </Router>
    
  );
}

export default App;
