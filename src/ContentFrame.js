import React, { Component } from 'react'
import './ContentFrame.css'
import HomeCarousel from './HomeCarousel'
import axios from "axios"
import {Link} from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GalleryPage from './GalleryPage'
import ImgPage from './ImgPage'

class ContentFrame extends Component {
    constructor({pageState}){
        super();
        const imageList=['./assets/img-others_wp17.jpg', 
        './assets/img-products_wp21.jpg',
        './assets/s2000_210916.jpg']
        this.state={
            homePageImages: imageList, 
            // galleryImgs: [], 
            // errMsg: '',
            // loginInfo: {
            //     email: '',
            //     password: '',
            // },
        };
    };

    

    // handlers

    // changeHandler = e =>{
    //     // this.setState({[e.target.email]: e.target.value})
    //     const {name, value} = e.target;
    //     this.setState((prevState)=>({
    //         loginInfo: {
    //             ...prevState.loginInfo,
    //             [name]: value,
    //         },
    //     }));
    // };
    // onLogInSubmit = e =>{
    //     e.preventDefault();
    //     axios.post('http://localhost:3000/api/v2/user/login/', this.state.loginInfo, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }).then(response => {
    //         this.props.setUserInfo(response.data.userInfo);
    //         this.props.changeTab('Home');
    //     }).catch(err => {
    //         // console.log(err.response.data);
    //         alert(err.response.data);
    //         this.props.changeTab('Home');
    //     })
    // }

    // render functions

    renderHome() {
        return (
            <div>
                <h2>Welcome!</h2>
                <HomeCarousel images={this.state.homePageImages} />
                <h2>This is Ethan's personal website. You can click the hamburger button to choose tabs</h2>
            </div>
        )
    }
    // renderGallery() {
    //     return (
    //         <Router>
    //             <Routes>
    //                 <Route path="/" Component={ContentFrame} />
    //                 <Route path="/gallery" Component={GalleryPage} />
    //                 <Route path='/img' Component={ImgPage} />
    //             </Routes>
    //             <GalleryPage userInfo={this.props.userInfo}/>
    //         </Router>
    //         // <div>
    //         //     <h2>Public Gallery</h2>
    //         //     <div className='imgGrid'>
    //         //         {
    //         //             this.state.galleryImgs.length ?
    //         //             this.state.galleryImgs.map((image)=>(
    //         //                 <div className='imgItem' key={image._id}>
    //         //                     <Link to={{
    //         //                         pathname: "/img/" + image._id ,
    //         //                         state: {
    //         //                             image: image,
    //         //                             userInfo: this.props.userInfo,
    //         //                         }
    //         //                     }}>
    //         //                         <img src={"http://localhost:3000/"+image.img} alt={image._id}></img>
    //         //                     </Link>
    //         //                 </div>
    //         //             )) :
    //         //             null
    //         //         }
    //         //         {
    //         //             this.state.errMsg ? <div>{this.state.errMsg}</div> : null
    //         //         }
    //         //     </div>
    //         // </div>
    //     )
    // }
    // renderLogIn() {
    //     return (
    //         <div>
    //             <h2>Log In</h2>
    //             <form onSubmit={this.onLogInSubmit}>
    //                 <div>
    //                     <input type='text' name='email' value={this.state.loginInfo.email}
    //                     onChange={this.changeHandler} placeholder='email'/>
    //                 </div>
    //                 <div>
    //                     <input type='password' name='password' value={this.state.loginInfo.password}
    //                     onChange={this.changeHandler} placeholder='password'/>
    //                 </div>
    //                 <button type='submit'>Submit</button>
    //             </form>
    //         </div>
    //     )
    // }
    // renderLogOut() {
    //     // this.props.setEmail('');
    //     // this.props.setAuthToken('');
    //     this.props.setUserInfo(null);
    //     return (
    //         <div>
    //             <h2>Log out successfully. You can use bottons in the side bar to jump to other pages.</h2>
    //         </div>
    //     )
    // }
    renderImg(){}

    render() {
        return this.renderHome();
        if (this.props.pageState==='Home'){
            return this.renderHome();
        }
        if (this.props.pageState==='Gallery'){
            return this.renderGallery();
        }
        if (this.props.pageState==='Notes'){
            return this.renderNotes();
        }
        if (this.props.pageState==='Career'){
            return this.renderCareer();
        }
        // user state related
        if (this.props.pageState==='LogIn'){
            return this.renderLogIn();
        }
        if (this.props.pageState==='SignUp'){
            return this.renderSignUp();
        }
        if (this.props.pageState==='LogOut'){
            return this.renderLogOut();
        }
        // details
        if (this.props.pageState==='ImgInfo'){
            return this.renderImg();
        }


        this.renderHome();
    }
};

export default ContentFrame;