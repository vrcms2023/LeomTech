import React, { useEffect, useState } from "react";
import Title from "../../Common/Title";
import BriefIntroFrontend from "../../Common/BriefIntro";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import AboutImageInputsForm from "../../Admin/Components/forms/aboutusImgTitleIntoForm";
import AdminBriefIntro from "../../Admin/Components/BriefIntro/index";
import EditIcon from "../../Common/AdminEditIcon";
import ModelBg from "../../Common/ModelBg";

import { removeActiveClass } from "../../util/ulrUtil";
import {
  getFormDynamicFields,
  getAboutUSSectionFields,
} from "../../util/dynamicFormFields";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";

import Banner from "../../Common/Banner";
import AboutSection from "../Components/AboutSection";

const About = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    about: false,
    vision: false,
    mission: false,
  };

  const pageType = "aboutus";
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
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}-banner/`}
          bannerState={componentEdit.banner}
        />
      </div>
      {componentEdit.banner ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm
            editHandler={editHandler}
            componentType="banner"
            pageType={`${pageType}-banner`}
            imageLabel="Banner Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(`${pageType}-banner`)}
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

      <div className="container my-md-5 ">
        {isAdmin ? (
          <EditIcon editHandler={() => editHandler("about", true)} />
        ) : (
          ""
        )}

        <AboutSection
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}-aboutDetails/`}
          bannerState={componentEdit.about}
        />

        {componentEdit.about ? (
          <div className="adminEditTestmonial">
            <AboutImageInputsForm
              editHandler={editHandler}
              componentType="about"
              pageType={`${pageType}-aboutDetails`}
              imageLabel="Banner Image"
              showDescription={false}
              showExtraFormFields={getAboutUSSectionFields(
                `${pageType}-aboutDetails`,
              )}
            />
          </div>
        ) : (
          ""
        )}

        {isAdmin ? (
          <EditIcon editHandler={() => editHandler("vision", true)} />
        ) : (
          ""
        )}

        <AboutSection
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}-aboutVision/`}
          bannerState={componentEdit.vision}
        />

        {componentEdit.vision ? (
          <div className="adminEditTestmonial">
            <AboutImageInputsForm
              editHandler={editHandler}
              componentType="vision"
              pageType={`${pageType}-aboutVision`}
              imageLabel="Banner Image"
              showDescription={false}
              showExtraFormFields={getAboutUSSectionFields(
                `${pageType}-aboutVision`,
              )}
            />
          </div>
        ) : (
          ""
        )}

        {isAdmin ? (
          <EditIcon editHandler={() => editHandler("mission", true)} />
        ) : (
          ""
        )}
        <AboutSection
          getBannerAPIURL={`banner/clientBannerIntro/${pageType}-aboutMission/`}
          bannerState={componentEdit.mission}
        />

        {componentEdit.mission ? (
          <div className="adminEditTestmonial">
            <AboutImageInputsForm
              editHandler={editHandler}
              componentType="mission"
              pageType={`${pageType}-aboutMission`}
              imageLabel="Banner Image"
              showDescription={false}
              showExtraFormFields={getAboutUSSectionFields(
                `${pageType}-aboutMission`,
              )}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      {show && <ModelBg />}
    </>
  );
};

export default About;
