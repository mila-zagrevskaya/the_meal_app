import React, { Component } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.scss';

export class SliderComponent extends Component {
  render() {
    const settings = {
      dots: true,
      arrows: true,
      centerMode: true,
      swipeToSlide: true,
      slidesToShow: 7,
      slidesToScroll: 1,
    };
    return <Slider {...settings}>{this.props.children}</Slider>;
  }
}
