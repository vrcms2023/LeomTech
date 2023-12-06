import React from "react";
import banner1 from "../../Images/carousel1.jpg";
import banner2 from "../../Images/carousel2.jpg";
import banner3 from "../../Images/carousel3.jpg";

// Styles

import "./Carousel.css";

const Carousel = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className="homeCarousel carousel slide"
      data-bs-ride="carousel"
    >
      {/* <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div> */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={banner1} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h1 className="fw-bold">LEOMTECH </h1>
            <p className="fw-normal fs-5">Exceptional Outcome services.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={banner2} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h1 className="fw-bold">HPR INFRA</h1>
            <p className="fw-normal fs-5">Cognitive Capabilities.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={banner3} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h1 className="fw-bold">HPR INFRA</h1>
            <p className="fw-normal fs-5">Cognitive Capabilities.</p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
