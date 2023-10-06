// In Slider.js
import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import { Link, useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';

const SliderComponent = ({ totalPages, currentPage, onNextPage }) => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(currentPage - 1);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const handlePrevClick = () => {
    const newPage = currentPage - 1;
    onNextPage(newPage);
    navigate(`/page/${newPage}`);
    setCurrentSlide(currentSlide - 1);
  };

  const handleNextClick = () => {
    const newPage = currentPage + 1;
    onNextPage(newPage);
    navigate(`/page/${newPage}`);
    setCurrentSlide(currentSlide + 1);
  };

  return (
    <div className="slider-container">
      <div className="slider-buttons">
        <button className="prev-button ll" onClick={handlePrevClick}>
          Prev
        </button>
        
      </div>
      <Slider {...settings} ref={sliderRef} initialSlide={currentSlide}>
        {[...Array(totalPages)].map((_, index) => (
          <Link to={`/page/${index + 1}`} key={index}>
            <div className={`slider-item ${currentSlide === index ? 'active' : ''}`}>
              {index + 1}
            </div>
          </Link>
        ))}
      </Slider>
      <button className="next-button ll" onClick={handleNextClick}>
          Next
        </button>
    </div>
  );
};

export default SliderComponent;
