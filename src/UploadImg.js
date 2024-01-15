import React, { Component } from 'react'
import axios from "axios"
import { Navigate } from 'react-router-dom';

class UploadImg extends Component {
constructor(){
  super();
  this.state={
    image: "",
    file: null,
    name: "",
    desc: "",
    date: "",
    dateStr: "",
    isPrivate: false,
    isSuccessful: false,
    jumpOut: false,
  }
}

changeHandler = e =>{
  // this.setState({[e.target.email]: e.target.value})
  const {name, value} = e.target;
  this.setState({
          [name]: value,
  });
};

privacyChangeHandler = e =>{
  // this.setState({[e.target.email]: e.target.value})
  this.setState({isPrivate: !this.state.isPrivate})
};

dateChangeHandler = e =>{
  // this.setState({[e.target.email]: e.target.value})
  const {name, value} = e.target;
  this.setState({
          [name]: value,
          dateStr: new Date(value).toJSON()
  });
};

fileChangeHandler = e =>{
  // this.setState({[e.target.email]: e.target.value})
  const {name, value} = e.target;
  const file =e.target.files[0];
  this.setState({
          [name]: value,
          file: file
  });
  
  // this.setState({file: file})
};

  onUploadImg = e =>{
      e.preventDefault();
      // console.log(this.state);

      var sentFormData=new FormData();
      sentFormData.append('name',this.state.name)
      sentFormData.append('date',this.state.dateStr)
      sentFormData.append('desc',this.state.desc)
      sentFormData.append('uploaderId',this.props.userInfo.id)
      sentFormData.append('img', this.state.file)
      // console.log(sentFormData)

      var url="http://localhost:3000/api/v2/gallery/public/new"
      if(this.state.isPrivate){
        url="http://localhost:3000/api/v2/gallery/private/new"
      }
      axios.post(url, sentFormData, {
          headers: {
              'authorization': 'Bearer '+this.props.userInfo.token,
          },
      }).then(response => {
        this.setState({isSuccessful: true, jumpOut: true});
      }).catch(err => {
          if(err.response.status===401){
            this.setState({jumpOut: true});
          }
          else{alert(err.message)}
      })
  };

  uploadFinish(){
    if(this.state.isSuccessful){
      alert("Upload successfully!");
      return (<Navigate to='/gallery' replace={true} />);
    }
    alert("Auth failed. Login timeout.");
    return (<Navigate to='/logOut' replace={true} />);
  }

  render() {
    return (
      <>
      {
        this.state.jumpOut ?
        this.uploadFinish():
        (
          <div>
            <h2>Upload an image</h2>
            <label>Select an image:</label>
            <form onSubmit={this.onUploadImg}>
              <div><input type='file' name='image' accept='image/png, image/jpeg' value={this.state.image} onChange={this.fileChangeHandler}/></div>
              <p><input type='text' name='name' placeholder="name of image" value={this.state.name} onChange={this.changeHandler}/></p>
          
              <p>
                <label>Choose time created: </label>
                <input type='datetime-local' name='date' value={this.state.date} onChange={this.dateChangeHandler}/>
              </p>
              <p><input type='text' name='desc' placeholder='description' value={this.state.desc} onChange={this.changeHandler}/></p>
              <p>
                <input type='checkbox' name='isPrivate' onChange={this.privacyChangeHandler}/>
                <label for='isPrivate'>set to private image</label>
              </p>
              <button type='submit'>Submit</button>
            </form>
          </div>
        )
      }
      </>
    )
  }
}

export default UploadImg;