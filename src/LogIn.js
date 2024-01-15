import React, { Component } from 'react'
import {Navigate} from "react-router-dom"
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from "axios"

class LogIn extends Component {
constructor(){
    super();
    this.state={
        loginInfo: {
            email: '',
            password: '',
        },
        isSuccessful: false,
    };
    this.changeHandler.bind(this);
    this.onLogInSubmit.bind(this);
}

changeHandler = e =>{
    // this.setState({[e.target.email]: e.target.value})
    const {name, value} = e.target;
    this.setState((prevState)=>({
        loginInfo: {
            ...prevState.loginInfo,
            [name]: value,
        },
    }));
};

    onLogInSubmit = e =>{
        e.preventDefault();
        axios.post('http://localhost:3000/api/v2/user/login/', this.state.loginInfo, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            this.props.setUserInfo(response.data.userInfo);
            // this.props.changeTab('Home');
            this.setState({isSuccessful: true})
        }).catch(err => {
            // console.log(err.response.data);
            alert(err.response.data);
            // this.props.changeTab('Home');
        })
    };

  render() {
    return (
        // <Router>
        <>
        {
            this.state.isSuccessful ?
            (<Navigate to='/' replace={true} />) :
            (<div>
                <h2>Log In</h2>
                <form onSubmit={this.onLogInSubmit}>
                    <div>
                        <input type='text' name='email' value={this.state.loginInfo.email}
                        onChange={this.changeHandler} placeholder='email'/>
                    </div>
                    <div>
                        <input type='password' name='password' value={this.state.loginInfo.password}
                        onChange={this.changeHandler} placeholder='password'/>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>)
        }
        </>
        // </Router>
    )
  }
}

export default LogIn;
