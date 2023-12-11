import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import BriefIntroFrontend from "../../Common/BriefIntro";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from "../../Admin/Components/BriefIntro/index";
import EditIcon from "../../Common/AdminEditIcon";
import ModelBg from "../../Common/ModelBg";
import Banner from "../../Common/Banner";

import { removeActiveClass } from "../../util/ulrUtil";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";

// Images Imports
import Title from "../../Common/Title";
import Search from "../../Common/Search";

// Styles
import "./Careers.css";
import JobPost from "../Components/JobPost";

const Careers = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    about: false,
    vision: false,
    mission: false,
  };

  const pageType = "careers";
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    removeActiveClass();
  }, []);

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

      {componentEdit.briefIntro ? (
        <div className="adminEditTestmonial">
          <AdminBriefIntro
            editHandler={editHandler}
            componentType="briefIntro"
            pageType={pageType}
          />
        </div>
      ) : (
        ""
      )}

      {/* <BriefIntro title="Welcome To LeomTech">
        We believe that construction is a man made wonder. The thought of
        bringing imagination to real life structures excites us, each day the
        passion in us grows as we contribute to this industry.
      </BriefIntro> */}

      <div className="container my-md-5 py-md-4">
        {isAdmin ? (
          <div className="text-end mb-4">
            <Link to="" className="btn btn-primary">
              Add New Career{" "}
              <i className="fa fa-plus ms-2" aria-hidden="true"></i>
            </Link>
          </div>
        ) : (
          ""
        )}

        <div className="row">
          <div className="col-md-6">
            <Title title="Careers" cssClass="fs-3" />
          </div>
          <div className="col-md-6">
            <Search />
          </div>
        </div>

        <div className="row">
          <JobPost />
        </div>
      </div>

      {show && <ModelBg />}
    </>
  );
};

export default Careers;
