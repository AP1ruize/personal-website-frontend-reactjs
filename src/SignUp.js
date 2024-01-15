import React, { Component } from 'react'
import {Navigate} from "react-router-dom"
import axios from "axios"

class SignUp extends Component {
    constructor(){
        super();
        this.state={
            email:"",
            password: "",
            password2: "",
            code:"",
            isSuccessful: false,
            isMatched: true,
            showButton: false,
        };
        this.changeHandler.bind(this);
        this.onSignUpSubmit.bind(this);
    }

    changeHandler = e =>{
        // this.setState({[e.target.email]: e.target.value})
        const {name, value} = e.target;
        this.setState({[name]: value,})
    };

    changePW2Handler = e =>{
        // this.setState({[e.target.email]: e.target.value})
        // const {name, value} = e.target;
        var pw2=e.target.value
        this.setState({password2: e.target.value,})
        if(pw2===this.state.password){
            this.setState({isMatched: true, showButton: true})
        } else {this.setState({isMatched: false, showButton: false})}
    };

    onSignUpSubmit = e =>{
        e.preventDefault();
        let sentData = {
            code: this.state.code,
            email: this.state.email,
            password: this.state.password
        }
        // console.log(this.state)
        axios.post('http://localhost:3000/api/v2/user/signup/', sentData, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            // this.props.changeTab('Home');
            this.setState({isSuccessful: true})
        }).catch(err => {
            // console.log(err);
            alert(err.response.data.message);
            // this.props.changeTab('Home');
        })
    };

  render() {
    if(this.state.isSuccessful){
        return <Navigate to={"/"} />
    }


    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={this.onSignUpSubmit}>
            <div>
                <input type='text' name='code' value={this.state.code}
                onChange={this.changeHandler} placeholder='invite code'/>
            </div>
            <div>
                <input type='text' name='email' value={this.state.email}
                onChange={this.changeHandler} placeholder='email'/>
            </div>
            <div>
                <input type='password' name='password' value={this.state.password}
                onChange={this.changeHandler} placeholder='password'/>
            </div>
            <div>
                <input type='password' name='password2' value={this.state.password2}
                onChange={this.changePW2Handler} placeholder='re-enter password'/>
            </div>
            <div>
                {this.state.isMatched ? <></> : <p>Passwords don't match!</p>}
            </div>
            {this.state.showButton ? <button type='submit'>Submit</button> : <button disabled>Submit</button>}
        </form>
      </div>
    )
  }
}
export default SignUp;