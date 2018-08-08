import React, { Component } from "react";
import * as ReactBootstrap from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';

class CarousalComponent extends Component {
    render() {
        return (
            <div className="carousal">
               <ReactBootstrap.Carousel>
                    <Carousel.Item>
                        <img className="carousal-img" alt="900x500" src=".././public/img/pic1.jpeg" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="carousal-img" alt="900x500" src=".././public/img/pic2.jpeg" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="carousal-img" alt="900x500" src=".././public/img/pic3.jpeg" />
                    </Carousel.Item>
                </ReactBootstrap.Carousel>
            </div>
        );
    }
}

export default CarousalComponent;




