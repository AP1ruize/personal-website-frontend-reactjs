import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from "axios"
import "./GalleryPage.css"

class GalleryPage extends Component {
    constructor(){
        super();
        this.state={
            galleryImgs: [], 
            errMsg: '',
        };
    }

    componentDidMount(){
        axios.get("http://localhost:3000/api/v2/gallery/public/")
        .then(response => {
            this.setState({galleryImgs: response.data})
        })
        .catch(error =>{
            this.setState({errMsg: "Fault to retreive data"})
        })
    }

  render() {
    return (
      <div>
        <h2>Public Gallery</h2>
        {
            this.props.userInfo!=null?
            (
                <div>
                    <Link to="/newImg"><button>Upload image</button></Link>
                    <Link to="/pvtGallery/pvt"><button>My private imgs</button></Link>
                    <Link to="/pvtGallery/pub"><button>My public imgs</button></Link>
                    <Link to="/pvtGallery/all"><button>All my imgs</button></Link>
                </div>
            ): 
            <></>
        }
        <div className='imgGrid'>
            {
                this.state.galleryImgs.length ?
                this.state.galleryImgs.map((image)=>(
                    <div className='imgItem' key={image._id}>
                        <Link to={'/img/'+image._id}>
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
      </div>
    )
  }
}

export default GalleryPage;
