import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Components
import BriefIntroFrontend from "../../Common/BriefIntro";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from "../../Admin/Components/BriefIntro/index";
import EditIcon from "../../Common/AdminEditIcon";
import ModelBg from "../../Common/ModelBg";
import Banner from "../../Common/Banner";
import JobCurrentOpenings from "../Components/JobCurrentOpenings";
import { axiosServiceApi } from "../../util/axiosUtil";

import { removeActiveClass } from "../../util/ulrUtil";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";

// Images Imports
import CareersBanner from "../../Images/Banner_8.jpg";
import Title from "../../Common/Title";

// Styles
import "./Careers.css";
import JobBriefDetails from "../Components/JobBriefDetails";

const Careers = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    about: false,
    vision: false,
    mission: false,
  };

  const pageType = 'career-details'
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState({});
  let { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    removeActiveClass();
  }, []);

  useEffect(() => {
    const getCareerData = async () => {
      try {
        let response = await axiosServiceApi.get(`/careers/updateCareer/${id}/`);
        setPosts(response.data.careers)
      } catch (error) {
        console.log("Unable to get the Career data");
      }
    };
      getCareerData();
   
  }, [id]);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      {/* Page Banner Component */}

<div className="position-relative">
        {isAdmin ? (
          <EditIcon editHandler={() => editHandler("banner", true)} />
        ) : (
          ""
        )}
        <Banner
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}/`}
          bannerState={componentEdit.banner}
        />
      </div>


      {componentEdit.banner ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm
            editHandler={editHandler}
            componentType="banner"
            pageType={pageType}
            extraFormParamas={[
              { pageType: pageType },
              { bannerTitle: "Careers" },
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
        pageType={pageType}
      />

      <div className="container my-md-5 py-md-4">
        <div className="row">
          <div className="col-md-6">
            <Title title="Careers Details" />
          </div>
          <div className="col-md-6 text-end">
            <Link to="/careers" className="btn btn-secondary">
              <i className="fa fa-chevron-left me-2" aria-hidden="true"></i> Back{" "}
            </Link>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-9 px-4">
            <JobBriefDetails  jobDetails={posts}/>
            <div className="mt-4">
              {posts.description ? (
                 <div dangerouslySetInnerHTML={{ __html: posts.description }} />
              ) : ('')}

              {/* <div className="mt-3">
                <span className="d-block">
                  <strong>Department</strong> : Engineering - Software & QA
                </span>
                <span className="d-block">
                  <strong>Employment Type</strong>: Full Time, Permanent
                </span>
              </div> */}
            </div>
          </div>
          <div className="col-md-3">
            <JobCurrentOpenings />
          </div>
        </div>
      </div>



          {componentEdit.briefIntro ? (
        <div className="adminEditTestmonial">
          <AdminBriefIntro
            editHandler={editHandler}
            componentType="briefIntro"
            pageType={pageType}
            extraFormParamas={[
              { pageType: pageType },
              { bannerTitle: "Aboutus" },
            ]}
          />
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </>
  );
};

export default Careers;
