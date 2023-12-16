import React, { useEffect, useState } from "react";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getBaseURL } from "../../util/ulrUtil";

// Styles

import "./Carousel.css";
import { getImagePath } from "../../util/commonUtil";

const Carousel = ({ carouselState }) => {
  const [carousel, setCarousel] = useState([]);
  const baseURL = getBaseURL();

  useEffect(() => {
    const getCarousels = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `carousel/clientCarousel/`,
        );
        if (response?.status == 200) {
          let key = Object.keys(response.data);
          setCarousel(response.data[key]);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!carouselState) {
      getCarousels();
    }
  }, [carouselState]);

  return (
    <div
      id="carouselExampleIndicators"
      className="homeCarousel carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {carousel?.map((item, index) => (
          <div
            className={`carousel-item ${index == 0 ? "active" : ""}`}
            key={item.id}
          >
            <img
              src={getImagePath(item.path)}
              alt={item.alternitivetext}
              className="d-block w-100"
            />
            <div className="carousel-caption d-none d-md-block">
              <h1 className="fw-bold">{item.carouseTitle ? item.carouseTitle : ''} </h1>
              <p className="fw-normal fs-5">{item.carouseDescription ? item.carouseDescription : ''} </p>
            </div>
          </div>
        ))}
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
