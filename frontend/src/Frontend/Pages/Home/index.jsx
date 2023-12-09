import React, { useEffect, useState } from "react";

// Components

import BriefIntroFrontend from "../../../Common/BriefIntro";
import Carousel from "../../Components/Carousel";
import Testimonials from "../../Components/Testimonials";
import ModelBg from "../../../Common/ModelBg";
import AdminBanner from "../../../Admin/Components/forms/ImgTitleIntoForm-List";
import BriefIntro from "../../../Admin/Components/BriefIntro/";

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

const Home = () => {
  const editComponentObj = {
    carousel: false,
    briefIntro: false,
    projects: false,
    testmonial: false,
  };

  const [testimonis, setTestmonis] = useState([]);
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [introValue, setIntroValues] = useState([]);


  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    removeActiveClass();
  }, []);
/**
 * BriefIntroFrontend API call
 */
  useEffect(() => {
    const getBriefIntro = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/carousel/clientHomeIntro/Home/`
        );
        if (response?.status == 200) {
          setIntroValues(response.data.intro);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    getBriefIntro();
  }, [componentEdit.briefIntro]);
  
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
    getTestimonial();
  }, []);

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
            <Carousel />
          </div>
        </div>

        {/* Introduction */}
        {isAdmin ? (
          <EditIcon editHandler={() => editHandler("briefIntro", true)} />
        ) : (
          ""
        )}
        <BriefIntroFrontend title={`${introValue.intro_title ? introValue.intro_title : 'Please Update Title'}`}>
        {introValue.intro_desc ? introValue.intro_desc : 'Please Update Description'}
        </BriefIntroFrontend>

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

        {/* Edit News */}
        {isAdmin ? (
          <EditIcon editHandler={() => editHandler("projects", true)} />
        ) : (
          ""
        )}
        {/* End Of Edit News */}
        <div className="row py-5 homeNews">
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <div className="container">
              <h2 className="mb-5">News</h2>
              <div className="row">
                <HomeNews />
              </div>
            </div>
          </div>
        </div>

        {/* ABrief */}
        <div className="row">
          <div className="col-md-6 ABrief">
            <ABrief
              title="Careers"
              cssClass="mb-2 fw-bold title mb-4"
              linkClass="btn btn-primary mt-5"
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

      {componentEdit.carousel ? (
        <div className="container position-absolute adminEditTestmonial p-1">
          <AdminBanner editHandler={editHandler} componentType="carousel" />
        </div>
      ) : (
        ""
      )}

      {componentEdit.briefIntro ? (
        <div className="container position-fixed adminEditTestmonial p-1">
          <BriefIntro editHandler={editHandler} componentType="briefIntro" pageType='Home' />
        </div>
      ) : (
        ""
      )}

      {componentEdit.projects ? (
        <div className="container position-fixed adminEditTestmonial p-1">
          <AdminBanner editHandler={editHandler} componentType="projects" />
        </div>
      ) : (
        ""
      )}

      {componentEdit.testmonial ? (
        <div className="container position-fixed adminEditTestmonial p-1">
          <AdminBanner editHandler={editHandler} componentType="testmonial" />
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </>
  );
};

export default Home;
