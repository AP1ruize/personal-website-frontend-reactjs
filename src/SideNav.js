import React from 'react'
import "./SideNav.css"
import { useNavigate } from 'react-router-dom';


const SideNav = ({isOpen})=>{
    
    const navigate=useNavigate();

    return(
        <div className={isOpen ? "SideNav_open" : "SideNav"}>
            <ul className='SideNavList'>
                <li className='SideBarButton' onClick={()=>navigate("/")}>Home</li>
                <li className='SideBarButton' onClick={()=>navigate('/gallery')}>Gallery</li>
                {/* <li className='SideBarButton' onClick={()=>handleTabClick('Notes')}>Notes</li> */}
                <li className='SideBarButton' onClick={()=>navigate('/career')}>Career</li>
            </ul>
        </div>
    );
};

export default SideNav;