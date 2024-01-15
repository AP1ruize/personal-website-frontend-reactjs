import React, { Component } from 'react'
import {Link, Navigate} from 'react-router-dom'
import axios from "axios"
import "./GalleryPage.css"

class PrivateGallery extends Component {
    constructor(){
        super();
        this.state={
            galleryImgs: [], 
            errMsg: '',
            toHome:false,
        };
    }

    componentDidMount(){
        var url="http://localhost:3000/api/v2/gallery/private/allImg"
        if(this.props.mode==='pvt'){url="http://localhost:3000/api/v2/gallery/private/allPvt"}
        if(this.props.mode==='pub'){url="http://localhost:3000/api/v2/gallery/private/allPub"}
        // console.log(this.props.userInfo.token)
        
        axios.get(url,{
            headers: {
                'authorization': 'Bearer '+this.props.userInfo.token,
            },
        })
        .then(response => {
            // console.log(response)
            // console.log(response.status)
            // this.setState({galleryImgs: response.data})
            if(response.status===200){
                this.setState({galleryImgs: response.data})
            }else{
                if(response.status===401){
                    this.setState({toHome: true});
                } else{
                    this.setState({errMsg: "Fault to retreive data"})
                }
            }
        })
        .catch(error=>{
            if(error.response.status===401){
                this.setState({toHome: true});
            } else{
                this.setState({errMsg: "Fault to retreive data"})
            }
        })
    }
renderPage(){
    var title="All of my images";
    if(this.props.mode==='pvt'){title="All of my private images"}
    if(this.props.mode==='pub'){title="All of my public images"}
    return (
        <div>
            <h2>{title}</h2>
            {
            this.state.errMsg ?
            (<p>{this.state.errMsg}</p>):
            (
                <div className='imgGrid'>
                {
                    this.state.galleryImgs.length ?
                    this.state.galleryImgs.map((image)=>(
                    <div className='imgItem' key={image._id}>
                        <Link to={image.private? ('/pvtImg/'+image._id) : ('/img/'+image._id)}>
                            <img src={"http://localhost:3000/"+image.img} alt={image._id} />
                        </Link>
                    </div>
                    )) :
                    <p>empty</p>
                }
            {
                this.state.errMsg ? <div>{this.state.errMsg}</div> : null
            }
        </div>
            )
            }
        </div>
    )
}

render() {
    if(this.state.toHome){
        this.props.toLogOut();
        return (<Navigate to='/gallery' replace={true} />);
    }
    return this.renderPage();
  }
}
export default PrivateGallery;
