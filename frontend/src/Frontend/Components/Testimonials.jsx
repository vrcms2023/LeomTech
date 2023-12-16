import React, { useState, useEffect } from "react";
import Title from "../../Common/Title";
import { Link } from "react-router-dom";
import AdminTestimonials from "../../Admin/Components/forms/ImgTitleIntoForm-List";
import ModelBg from "../../Common/ModelBg";

import EditIcon from "../../Common/AdminEditIcon";

import leftArrow from "../../Images/left.png";
import rightArrow from "../../Images/right.png";
import testimonialUser from "../../Images/testimonial.jpg";

import "./Testimonials.css";
import { getBaseURL } from "../../util/ulrUtil";
import { getImagePath } from "../../util/commonUtil";

const Testimonials = ({ testimonis }) => {
  const editComponentObj = {
    logo: false,
    menu: false,
  };

  const [admin, setAdmin] = useState(true);
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
  };

  const [index, setIndex] = useState(0);
  const baseURL = getBaseURL();
  useEffect(() => {
    if (testimonis.length > 1) {
      const lastIndex = testimonis?.length - 1;
      if (index < 0) {
        setIndex(lastIndex);
      }

      if (index > lastIndex) {
        setIndex(0);
      }
    }
  }, [index]);

  useEffect(() => {
    if (testimonis.length > 1) {
      let slider = setInterval(() => {
        setIndex(index + 1);
      }, 5000);
      return () => {
        clearInterval(slider);
      };
    }
  }, [index]);

  const ListOfTestimonials = testimonis?.map((item, indexPeople) => {
    const { imageUrl, title, description } = item;
    let position = "nextSlide";
    if (indexPeople === index) {
      position = "activeSlide";
    }
    if (
      indexPeople === index - 1 ||
      (index === 0 && indexPeople === testimonis.length - 1)
    ) {
      position = "lastSlide";
    }
    return (

      <div className={`${position} article position-absolute `} key={item.id}>
        <Title title={item.testimonialTitle} cssClass="mb-2 fw-normal fs-2 text-uppercase text-white" />

        {!item.path ? (
          <i className="fa fa-user text-white" aria-hidden="true"></i>
        ) : (
          <img
            src={getImagePath(item.path)}
            className="rounded-circle my-4 testimonialImg"
            alt="User"
          />
        )}
        <p className="mt-3 px-0 px-md-5 text-white">{item.imageDescription}</p>
        <div className="text-center">
          <Link to="" onClick={() => setIndex(index + 1)}>
            {" "}
            <img src={leftArrow} alt="Previous" width="42" height="42" />
          </Link>
          <Link to="" onClick={() => setIndex(index - 1)}>
            {" "}
            <img src={rightArrow} alt="Next" width="42" height="42" />
          </Link>
        </div>
      </div>
    );
  });

  return <>{ListOfTestimonials.length > 1 ? ListOfTestimonials : <h4>Please add 2 or more testimonials to show.</h4> }</>;
};

export default Testimonials;
