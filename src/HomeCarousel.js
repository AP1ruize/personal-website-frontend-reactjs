import React, { Component } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "./HomeCarousel.css"

export default class HomeCarousel extends Component {
  render() {
    return (
    //   <div>HomeCarousel</div>
        <Carousel className="carousel" autoPlay={true} infiniteLoop={true} interval={5000} width={"90%"} showThumbs={false} stopOnHover={false}>
            {this.props.images.map((image, index)=>(
                <img key={index} src={image} alt={`Slide ${index}`} />
            ))}
        </Carousel>
    )
  }
}
