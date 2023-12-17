import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import BriefIntroFrontend from "../../Common/BriefIntro";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import AdminBriefIntro from "../../Admin/Components/BriefIntro/index";
import EditIcon from "../../Common/AdminEditIcon";
import ModelBg from "../../Common/ModelBg";
import Banner from "../../Common/Banner";
import { removeActiveClass } from "../../util/ulrUtil";
import {
  getFormDynamicFields,
  getServiceFormFields,
} from "../../util/dynamicFormFields";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import Title from "../../Common/Title";

// Images Imports
import ServicesBanner from "../../Images/Banner_8.jpg";
import insured from "../../Images/insrued.png";

import "./services.css";
import { Link, useRouteError } from "react-router-dom";
import AddService from "../../Admin/Components/Services";
import AddEditAdminNews from "../../Admin/Components/News";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getImagePath } from "../../util/commonUtil";

const Services = () => {
  const editComponentObj = {
    addSection: false,
    editSection: false,
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
  const [selectedServiceProject, setSelectedServiceProject] = useState({});
  const [selectedServiceList, setSelectedServiceList] = useState([]);
  const [editCarousel, setEditCarousel] = useState({});
  let { uid, } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getSelectedServiceObject(uid);
  }, [uid]);

  useEffect(() => {
    removeActiveClass();
  }, []);

  useEffect(() => {
    if (selectedServiceProject?.id) {
      setEditCarousel({
        serviceID: selectedServiceProject ? selectedServiceProject.id : "",
      });
      getSelectedServiceObject(selectedServiceProject.id);
    }
  }, [selectedServiceProject]);

  const getSelectedServiceObject = async (id) => {
    try {
      let response = await axiosClientServiceApi.get(
        `/services/getSelectedClientService/${id}/`,
      );
      setSelectedServiceList(response.data.servicesFeatures);
    } catch (error) {
      console.log("Unable to get the intro");
    }
  };

  useEffect(() => {
    if (
      (!componentEdit.editSection || !componentEdit.addSection) &&
      selectedServiceProject?.id !== undefined
    ) {
      getSelectedServiceObject(selectedServiceProject.id);
    }
  }, [componentEdit.editSection, componentEdit.addSection]);

  const editHandler = (name, value, item) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    if (item?.id) {
      setEditCarousel(item);
    }
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

      {isAdmin ? (
        <AddService
          setSelectedServiceProject={setSelectedServiceProject}
          selectedServiceProject={selectedServiceProject}
        />
      ) : (
        ""
      )}

      <div className="container my-md-5 py-md-4 servicesPage">
        {isAdmin && selectedServiceProject?.id ? (
          <>
            <button
              type="submit"
              class="btn btn-primary"
              onClick={() => editHandler("addSection", true)}
              style={{ position: "absolute", right: "60px" }}
            >
              Add data
              <i className="fa fa-plus ms-2" aria-hidden="true"></i>
            </button>
          </>
        ) : (
          ""
        )}

        {componentEdit.editSection || componentEdit.addSection ? (
          <div className="adminEditTestmonial">
            <AddEditAdminNews
              editHandler={editHandler}
              category="services"
              editCarousel={editCarousel}
              setEditCarousel={setEditCarousel}
              componentType={`${
                componentEdit.editSection ? "editSection" : "addSection"
              }`}
              imageGetURL="services/createServiceFeatures/"
              imagePostURL="services/createServiceFeatures/"
              imageUpdateURL="services/updateFeatureService/"
              imageDeleteURL="services/updateFeatureService/"
              imageLabel="Add Service Banner"
              showDescription={false}
              showExtraFormFields={getServiceFormFields(
                selectedServiceProject ? selectedServiceProject.id : "",
              )}
            />
          </div>
        ) : (
          ""
        )}

        <div className="row">
          <div className="col-12 col-md-8">
            <Title title="Services" cssClass="fs-3 mb-2" />
          </div>
        </div>
        {selectedServiceList.map((item, index) => (
          <div
            className={`row ${isAdmin ? "border border-warning mb-3" : "" } ${index % 2 === 0 ? "normalCSS" : "flipCSS"}`}
            key={item.id}
          >
            {isAdmin ? (
              <EditIcon
                editHandler={() => editHandler("editSection", true, item)}
              />
            ) : (
              ""
            )}
            <div className="col-md-8">
              <Title
                title={
                  item.feature_title
                    ? item.feature_title
                    : "Update Feature title"
                }
                cssClass="fs-3 mt-3 mb-2"
              />
              <Title
                title={
                  item.feature_sub_title
                    ? item.feature_sub_title
                    : "Update Feature sub title"
                }
                cssClass="fs-5 fw-bold"
              />
    
                <div
                  dangerouslySetInnerHTML={{ __html: item.feature_description }}
                />
            
            </div>
            <div className="col-md-4">
              <img src={getImagePath(item.path)} alt="" />
            </div>
          </div>
        ))}
      </div>

      {componentEdit.about ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm
            editHandler={editHandler}
            componentType="banner"
            pageType={`${pageType}-about`}
            imageLabel="Banner Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(`${pageType}-about`)}
          />
        </div>
      ) : (
        ""
      )}

      {componentEdit.vision ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm
            editHandler={editHandler}
            componentType="banner"
            pageType={`${pageType}-vision`}
            imageLabel="Banner Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(`${pageType}-vision`)}
          />
        </div>
      ) : (
        ""
      )}

      {componentEdit.mission ? (
        <div className="adminEditTestmonial">
          <ImageInputsForm
            editHandler={editHandler}
            componentType="banner"
            pageType={`${pageType}-mission`}
            imageLabel="Banner Image"
            showDescription={false}
            showExtraFormFields={getFormDynamicFields(`${pageType}-mission`)}
          />
        </div>
      ) : (
        ""
      )}
      {show && <ModelBg />}
    </>
  );
};

export default Services;
