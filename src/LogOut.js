import React, { Component } from 'react'
import {Navigate} from "react-router-dom"

class LogOut extends Component {
    renderLogOut() {
        // this.props.setEmail('');
        // this.props.setAuthToken('');
        // this.props.setUserInfo(null);
        this.props.toLogOut();
        return (
          <Navigate to='/' replace={true} />
        )
    }
  render() {
    return this.renderLogOut();
  }
}

export default  LogOut;
