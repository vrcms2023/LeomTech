import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../Common/Title";
import { toast } from "react-toastify";
import BriefIntroFrontend from "../../Common/BriefIntro";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import AboutImageInputsForm from "../../Admin/Components/forms/aboutusImgTitleIntoForm";
import AdminBriefIntro from "../../Admin/Components/BriefIntro/index";
import EditIcon from "../../Common/AdminEditIcon";
import ModelBg from "../../Common/ModelBg";
import AddEditAdminNews from "../../Admin/Components/News";
import { removeActiveClass } from "../../util/ulrUtil";
import {
  getFormDynamicFields,
  getAboutUSSectionFields,
  imageDimensionsJson,
} from "../../util/dynamicFormFields";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";

import Banner from "../../Common/Banner";
import AboutSection from "../Components/AboutSection";
import { axiosClientServiceApi, axiosServiceApi } from "../../util/axiosUtil";
import { getImagePath } from "../../util/commonUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../Common/DeleteDialog";
import { sortByUpdatedDate } from "../../util/dataFormatUtil";
import moment from "moment";

import "./About.css";

const About = () => {
  const editComponentObj = {
    banner: false,
    briefIntro: false,
    addSection: false,
    editSection: false,
  };

  const pageType = "aboutus";
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [aboutList, setAboutList] = useState([]);
  const [show, setShow] = useState(false);
  const [editCarousel, setEditCarousel] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    removeActiveClass();
  }, []);

  useEffect(() => {
    getAboutUsList();
  }, []);

  const editHandler = (name, value, item) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    if (item?.id) {
      setEditCarousel(item);
    }
    document.body.style.overflow = "hidden";
  };

  const getAboutUsList = async (id) => {
    try {
      let response = await axiosClientServiceApi.get(`aboutus/clientAboutus/`);
      let data = sortByUpdatedDate(response.data.aboutus);
      setAboutList(data);
    } catch (error) {
      console.log("Unable to get the intro");
    }
  };

  useEffect(() => {
    if (!componentEdit.editSection && !componentEdit.addSection) {
      getAboutUsList();
      setEditCarousel({});
    }
  }, [componentEdit.editSection, componentEdit.addSection]);

  const deleteAboutSection = (item) => {
    const id = item.id;
    const name = item.aboutus_title;

    const deleteSection = async () => {
      const response = await axiosServiceApi.delete(
        `/aboutus/updateAboutus/${id}/`,
      );
      if (response.status === 204) {
        const list = aboutList.filter((list) => list.id !== id);
        setAboutList(list);
        toast.success(`${name} is deleted`);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteSection}
            message={`deleting the ${name} Service?`}
          />
        );
      },
    });
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
            dimensions={imageDimensionsJson("banner")}
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

      <div className="container-fluid container-lg my-md-5 ">
        <div className="row">
          <div className="col-md-6 fs-3 mt-4 mt-md-0">
            <Title title="About Us" cssClass="fs-1" />
          </div>
          {isAdmin ? (
            <div className="col-md-6">
              <div className="d-flex justify-content-end align-items-center mb-3">
                <span className="fw-bold me-2">Add content </span>
                <button
                  type="submit"
                  className="btn btn-primary px-3"
                  onClick={() => editHandler("addSection", true)}
                >
                  {" "}
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {componentEdit.editSection || componentEdit.addSection ? (
          <div className="adminEditTestmonial">
            <AddEditAdminNews
              editHandler={editHandler}
              category="about"
              editCarousel={editCarousel}
              setEditCarousel={setEditCarousel}
              componentType={`${
                componentEdit.editSection ? "editSection" : "addSection"
              }`}
              imageGetURL="aboutus/clientAboutus/"
              imagePostURL="aboutus/createAboutus/"
              imageUpdateURL="aboutus/updateAboutus/"
              imageDeleteURL="aboutus/updateAboutus/"
              imageLabel="Add About us Banner"
              showDescription={false}
              showExtraFormFields={getAboutUSSectionFields()}
              dimensions={imageDimensionsJson("aboutus")}
            />
          </div>
        ) : (
          ""
        )}

        <div className="row aboutPage">
          {aboutList.length > 0 ? (
            aboutList.map((item, index) => (
              <>
                <div
                  key={item.id}
                  className={`row mb-2 ${
                    isAdmin
                      ? "border border-warning mb-3 position-relative"
                      : ""
                  } ${index % 2 === 0 ? "normalCSS" : "flipCSS"}`}
                >
                  {isAdmin ? (
                    <>
                      <EditIcon
                        editHandler={() =>
                          editHandler("editSection", true, item)
                        }
                      />
                      <Link
                        className="deleteSection"
                        onClick={() => deleteAboutSection(item)}
                      >
                        <i
                          className="fa fa-trash-o text-danger fs-4"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                  <div className="col-12 col-lg-7 p-3 p-md-4 py-md-4 d-flex justify-content-center align-items-start flex-column">
                    {item.aboutus_title ? (
                      <Title
                        title={item.aboutus_title}
                        cssClass="fs-1 fw-bold mb-1"
                      />
                    ) : (
                      ""
                    )}

                    {item.aboutus_sub_title ? (
                      <Title
                        title={item.aboutus_sub_title}
                        cssClass="fs-5 text-secondary mb-2"
                      />
                    ) : (
                      ""
                    )}
                    {/* <p>{moment(item.created_at).format('DD-MM-YYYY hh:mm:ss')}</p> */}
                    {item.aboutus_sub_title ? (
                      <Title
                        title={item.aboutus_sub_title}
                        cssClass="fs-5 text-secondary mb-2"
                      />
                    ) : (
                      ""
                    )}

                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.aboutus_description,
                      }}
                    />
                  </div>

                  <div className="col-lg-5 d-none d-lg-block h-100">
                    <div className="h-100 p-3 p-md-5 py-md-4 d-flex flex-column justify-content-center align-items-center reset ">
                      <img
                        src={getImagePath(item.path)}
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
                <hr className="border-secondary" />
              </>
            ))
          ) : (
            <p className="text-center text-muted py-5">
              Please add page contents...
            </p>
          )}
        </div>
      </div>

      {show && <ModelBg />}
    </>
  );
};

export default About;
