import React, { useEffect, useState } from "react";

// Components

import BriefIntroFrontend from "../../../Common/BriefIntro";
import Carousel from "../../Components/Carousel";
import Testimonials from "../../Components/Testimonials";
import ModelBg from "../../../Common/ModelBg";
import AdminBanner from "../../../Admin/Components/forms/ImgTitleIntoForm-List";
import BriefIntroAdmin from "../../../Admin/Components/BriefIntro/";

import EditIcon from "../../../Common/AdminEditIcon";
import ABrief from "../../Components/ABrief";
import ABriefAbout from "../../Components/ABriefAbout";
import HomeNews from "../../Components/HomeNews";
import HomeServices from "../../Components/HomeServices";
import { axiosClientServiceApi } from "../../../util/axiosUtil";
import { removeActiveClass } from "../../../util/ulrUtil";
import { useAdminLoginStatus } from "../../../Common/customhook/useAdminLoginStatus";
// Styles

import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const editComponentObj = {
    carousel: false,
    briefIntro: false,
    projects: false,
    testmonial: false,
  };

  const pageType = "home";
  const [testimonis, setTestmonis] = useState([]);
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    removeActiveClass();
  }, []);

  useEffect(() => {
    const getTestimonial = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/testimonials/clientTestimonials/`,
        );
        if (response?.status === 200) {
          setTestmonis(response.data.testimonial);
        }
      } catch (e) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.testmonial) {
      getTestimonial();
    }
  }, [componentEdit.testmonial]);

  return (
    <>
      <div className="container-fluid">
        {/* Carousel */}
        <div className="row">
          <div className="col-md-12 p-0 carousel">
            {isAdmin ? (
              <EditIcon editHandler={() => editHandler("carousel", true)} />
            ) : (
              ""
            )}
            <Carousel carouselState={componentEdit.carousel} />
          </div>
        </div>

        {componentEdit.carousel ? (
          <div className="adminEditTestmonial">
            <AdminBanner
              editHandler={editHandler}
              componentType="carousel"
              getImageListURL="carousel/createCarousel/"
              deleteImageURL="carousel/updateCarousel/"
              imagePostURL="carousel/createCarousel/"
              imageUpdateURL="carousel/updateCarousel/"
              imageLabel="Add Carousel Image"
              extraFormParamas={[
                {
                  carouseTitle: {
                    readonly: true,
                    defaultValue: "Carouse Title",
                    fieldName: "carouseTitle",
                  },
                },
              ]}
            />
          </div>
        ) : (
          ""
        )}

        {/* Introduction */}
        {isAdmin ? (
          <EditIcon editHandler={() => editHandler("briefIntro", true)} />
        ) : (
          ""
        )}
        <BriefIntroFrontend
          introState={componentEdit.briefIntro}
          pageType="Home"
        />

        {componentEdit.briefIntro ? (
          <div className="adminEditTestmonial">
            <BriefIntroAdmin
              editHandler={editHandler}
              componentType="briefIntro"
              pageType="Home"
            />
          </div>
        ) : (
          ""
        )}

        {/* Services */}
        <div className="container py-5 homeServices">
          <h2 className="mb-5">What We Do</h2>
          <HomeServices />
        </div>

        {/* ABriefAbout */}
        <div className="row ABriefAbout">
          <ABriefAbout
            title="Who We Are"
            cssClass="mb-2 fw-bold title mb-4"
            linkClass="btn btn-primary mt-5"
          />
        </div>

        {/* End Of Edit News */}
        <div className="row py-5 homeNews">
          {/* {isAdmin ? (
            <div className="text-end mb-4">
              <Link to="" className="btn btn-primary">
                Add News <i className="fa fa-plus ms-2" aria-hidden="true"></i>
              </Link>
            </div>
          ) : (
            ""
          )} */}
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <div className="container">
              <h2 className="mb-5">News</h2>
              <div className="row">
                <HomeNews />
              </div>
            </div>
          </div>
        </div>

        {/* Careers - ABrief */}
        <div className="row">
          <div className="col-md-6 ABrief">
            <ABrief
              title="Careers"
              cssClass="mb-2 fw-bold title mb-4"
              linkClass="btn btn-primary mt-5"
              moreLink="/careers"
            />
          </div>

          <div className="col-md-6 p-5 testimonials text-center">
            {isAdmin ? (
              <EditIcon editHandler={() => editHandler("testmonial", true)} />
            ) : (
              ""
            )}
            {/* End Of Edit Testimonials */}
            {testimonis.length > 0 ? (
              <Testimonials testimonis={testimonis} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {componentEdit.testmonial ? (
        <div className="adminEditTestmonial">
          <AdminBanner
            editHandler={editHandler}
            componentType="testmonial"
            getImageListURL="testimonials/clientTestimonials/"
            deleteImageURL="testimonials/updateTestimonials/"
            imagePostURL="testimonials/createTestimonials/"
            imageUpdateURL="testimonials/updateTestimonials/"
            imageLabel="Add your Image"
            titleTitle='Testmonial Name'
            descriptionTitle="Testimonial Writeup "
            extraFormParamas={[
              {
                testimonialTitle: {
                  readonly: true,
                  defaultValue: "Testimonal Title",
                  fieldName: "testimonialTitle",
                },
              },
            ]}
          />
        </div>
      ) : (
        ""
      )}

      {componentEdit.projects ? (
        <div className="adminEditTestmonial">
          <AdminBanner editHandler={editHandler} componentType="projects" />
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </>
  );
};

export default Home;
