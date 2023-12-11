import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import BriefIntro from "../../Common/BriefIntro";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from "../../Admin/Components/BriefIntro/index";
import EditIcon from "../../Common/AdminEditIcon";
import ModelBg from "../../Common/ModelBg";
import Banner from "../../Common/Banner";
import JobCurrentOpenings from "../Components/JobCurrentOpenings";

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
          bannerImg={CareersBanner}
          alt="About LeomTech"
          title={"Leom Tech"}
          caption={"IT Consulting Services"}
        />
      </div>

      {/* Introduction */}
      {isAdmin ? (
        <EditIcon editHandler={() => editHandler("briefIntro", true)} />
      ) : (
        ""
      )}

      <BriefIntro title="Welcome To LeomTech">
        We believe that construction is a man made wonder. The thought of
        bringing imagination to real life structures excites us, each day the
        passion in us grows as we contribute to this industry.
      </BriefIntro>

      <div className="container my-md-5 py-md-4">
        <div className="row">
          <div className="col-md-6">
            <Title title="Careers Details" />
          </div>
          <div className="col-md-6 text-end">
            <Link to="/careers" className="btn btn-secondary">
              <i class="fa fa-chevron-left me-2" aria-hidden="true"></i> Back{" "}
            </Link>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-9 px-4">
            <JobBriefDetails />
            <div className="mt-4">
              <p>
                Peridot is seeking to hire a Business Analyst to support a
                Federal client in an upcoming effort in Washington DC.
                Interested candidates, please reply with resume, desired salary,
                and contact info to karunalatha.gadamsetti@peridotsolutions.com.
              </p>

              <p>
                The Contractor must provide professional acquisition management
                support to client program offices. The support work includes
                assisting in developing acquisition documentation and processes
                such as acquisition planning (AP); market research; requirements
                documentation, Statements of Work (SOW), Performance Work
                Statement (PWS), Statement of Objectives (SOO), or hybrids
                thereof; cost/ price estimates; quality assurance surveillance
                plans (QASP); and incorporation of budget information for
                acquisition packages used for release of synopses and
                solicitations. Also, support includes proposal evaluation
                activities and cost/ price analysis. A summary of the support
                activities includes:
              </p>
              <Title
                title="Requirements Documentation"
                cssClass="fs-5 fw-bold"
              />
              <p>
                Support the program office in identifying the requirement
                details. Review requirement documents with the program offices
                for requirement validation and clarity, participate in
                pre-proposal conferences as necessary and obtain input from
                technical officials prior to preparation of the solicitation.
                Conduct formal and informal training on requirements
                documentation as necessary.
              </p>

              <Title
                title="Pre-Solicitation Documentation"
                cssClass="fs-5 fw-bold"
              />
              <p>
                Support the program offices in the preparation of
                pre-solicitation documentation through collaboration with the
                responsible contracting officer. These documents include but are
                not limited to: the AP, Independent Government Cost Estimates
                (IGCE), market research, sole source documents, SOWs, SOOs, PWS,
                QASP, evaluation criteria, Justification & Approvals (J&As),
                Limited Source Justifications and/or other forms of
                documentation that may need to be submitted in a completed
                Purchase Request (PR) package to OCFO budget and contracting
                divisions for processing the requirements. Conduct formal and
                informal knowledge sharing sessions on the acquisition processes
                as necessary.
              </p>

              <div className="mt-3">
                <span className="d-block">
                  <strong>Department</strong> : Engineering - Software & QA
                </span>
                <span className="d-block">
                  <strong>Employment Type</strong>: Full Time, Permanent
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <JobCurrentOpenings />
          </div>
        </div>
      </div>

      {componentEdit.banner ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm editHandler={editHandler} componentType="banner" />
        </div>
      ) : (
        ""
      )}

      {componentEdit.briefIntro ? (
        <div className="adminEditTestmonial">
          <AdminBriefIntro
            editHandler={editHandler}
            componentType="briefIntro"
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
