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
import Title from "../../Common/Title";

// Images Imports
import ServicesBanner from "../../Images/Banner_8.jpg";
import insured from "../../Images/insrued.png";

import "./services.css";

const Services = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    about: false,
    vision: false,
    mission: false,
  };

  const pageType = "services";
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
  console.log("isAdmin", isAdmin);
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
          <div className="col-12 col-md-8">
            <Title title="Services" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-9">
            <Title
              title="PROGRAM MANAGEMENT & INDEPENDENT VERIFICATION & VALIDATION (IV&V)"
              cssClass="fs-3 mt-3 mb-2"
            />
            <Title
              title="Program Management Office (PMO) Support"
              cssClass="fs-5 fw-bold"
            />
            <p>
              Peridot Solutions offers a complete range of program management
              operations and program assessment capabilities designed to
              maximize the effectiveness of operations and ensure our clients
              achieve their program objectives.
            </p>
            <p>
              We have expertise with federal clients in this area and understand
              client-specific issues and challenges as practitioners and
              experienced managers. This service includes:
            </p>

            <ul className="list-group">
              <li className="list-group-item">
                PMO design and set up , which includes key role fulfillment,
                policies and procedures development, requirement development and
                analysis, and investment planning.
              </li>
              <li className="list-group-item">
                PMO operations and performance, which includes organization
                alignment, budget and schedule management, earned value
                management, integrated master schedule development and
                maintenance, capital planning and investment control,
                performance management and metrics, managing meetings, strategic
                communications, change management and risk and issue management.
              </li>
              <li className="list-group-item">
                Program assessments, which include program strategy, planning,
                execution and management.
              </li>
              <li className="list-group-item">
                Program administration services to assist with day-to-day
                management of large programs.
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <img src={insured} alt="" />
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

export default Services;
