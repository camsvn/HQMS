import React from "react";
import Slider from "infinite-react-carousel";

const SimpleSlider = () => (
  <Slider {...settings}>
    <div>
      <h3>1</h3>
    </div>
    <div>
      <h3>2</h3>
    </div>
    <div>
      <h3>3</h3>
    </div>
    <div>
      <h3>4</h3>
    </div>
    <div>
      <h3>5</h3>
    </div>
  </Slider>
);

const settings = {
  arrows: false,
  arrowsBlock: false,
  autoplay: true,
  autoplaySpeed: 4000,
  dots: true,
  duration: 400,
  overScan: 1,
  pauseOnHover: false,
  swipe: false,
};

export default SimpleSlider;
