import React, { Component } from 'react'
import './ContentFrame.css'
import HomeCarousel from './HomeCarousel'

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

    render() {
        return this.renderHome();
    }
};

export default ContentFrame;
