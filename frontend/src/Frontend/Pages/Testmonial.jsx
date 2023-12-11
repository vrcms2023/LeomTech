import React, { useEffect, useState } from "react";

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
import ServicesBanner from "../../Images/Banner_8.jpg";

const Testmonial = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    about: false,
    vision: false,
    mission: false,
  };

  const pageType = "testmonial";
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
              { bannerTitle: "Service" },
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

      <div className="container my-md-5 py-md-4">
        {isAdmin ? (
          <EditIcon editHandler={() => editHandler("mission", true)} />
        ) : (
          ""
        )}
        <div className="row">
          <div className="col-12 col-md-8 py-4 p-md-5">
            This page has to design
          </div>
        </div>
      </div>

      {componentEdit.about ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm editHandler={editHandler} componentType="about" />
        </div>
      ) : (
        ""
      )}

      {componentEdit.vision ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm editHandler={editHandler} componentType="vision" />
        </div>
      ) : (
        ""
      )}

      {componentEdit.mission ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm editHandler={editHandler} componentType="mission" />
        </div>
      ) : (
        ""
      )}
      {show && <ModelBg />}
    </>
  );
};

export default Testmonial;
