import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'

function Header(props){

    
        return(
            // <Router>
                <div className='Header'>
                    <span className='menuButton' onClick={props.onToggleSideBar}>&#9776;</span>
                    <h1>Memorial</h1>
                    <div className='userBar'>
                        {
                            props.userInfo===null ?
                            (<div><Link to="/logIn"><button>Log in</button></Link> <Link to="/signUp"><button>Sign up</button></Link></div>) :
                            (<div><a>Welcome, {props.userInfo.email}  </a><Link to="/logOut"><button>Log out</button></Link></div>)
                        }
                    </div>
                </div>
            // </Router>
            
        )
    
}


export default Header;
