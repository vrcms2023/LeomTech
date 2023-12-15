import React, { useState, useEffect } from "react";

// Components

import Title from "../../Common/Title";
import Model from "../../Common/Model";
import EditIcon from "../../Common/AdminEditIcon";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import News from "../Components/News";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { removeActiveClass } from "../../util/ulrUtil";
import ModelBg from "../../Common/ModelBg";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";

import AddEditAdminNews from "../../Admin/Components/News/index";

import Banner from "../../Common/Banner";

// Styles
import "./NewsAndUpdates.css";
import { Link } from "react-router-dom";
import AdminBanner from "../../Admin/Components/forms/ImgTitleIntoForm-List";
import HomeNews from "../Components/HomeNews";

const NewsAndUpdates = () => {
  const editComponentObj = {
    addNews: false,
    banner: false,
    news: false,
  };

  const pageType = "news";
  const [news, setNews] = useState([]);
  const [show, setShow] = useState(false);
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const isAdmin = useAdminLoginStatus();

  useEffect(() => {
    removeActiveClass();
  }, []);

  const [showModal, setShowModal] = useState(false);

  const [obj, setObj] = useState({});

  const articleHandler = (id) => {
    const searchObj = news.find((newsItem) => newsItem.id === id);
    setObj(searchObj);
    setShowModal(!showModal);
  };

  const closeModel = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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
              {
                pageType: {
                  readonly: true,
                  defaultValue: pageType,
                  fieldName: "pageType",
                },
              },
              {
                bannerTitle: {
                  label: "News",
                  type: "text",
                  fieldName: "bannerTitle",
                },
              },
            ]}
          />
        </div>
      ) : (
        ""
      )}

      <div className="container my-4 newsAndUpdates">
        <div className="row">
          <Title title="News And Updates" cssClass="blue-900 fs-4 mb-4" />

          {isAdmin ? (
            <div className="text-end mb-4">
              <Link
                to="#"
                className="btn btn-primary"
                onClick={() => editHandler("addNews", true)}
              >
                Add News <i className="fa fa-plus ms-2" aria-hidden="true"></i>
              </Link>
            </div>
          ) : (
            ""
          )}

          {componentEdit.addNews ? (
            <div className="adminEditTestmonial">
              <AddEditAdminNews
                editHandler={editHandler}
                componentType="addNews"
                imageGetURL="appNews/createAppNews/"
                imagePostURL="appNews/createAppNews/"
                imageUpdateURL="appNews/updateAppNews/"
                imageDeleteURL="appNews/updateAppNews/"
                imageLabel="Add News Image"
                extraFormParamas={[
                  {
                    bannerTitle: {
                      label: "News Title",
                      type: "text",
                      fieldName: "newstitle",
                    },
                  },
                ]}
              />
            </div>
          ) : (
            ""
          )}

          <HomeNews addNewsState={componentEdit.addNews} />
        </div>
      </div>
      {showModal && <Model obj={obj} closeModel={closeModel} flag="news" />}
      {showModal && <ModelBg closeModel={closeModel} />}

      {show && <ModelBg />}
    </>
  );
};

export default NewsAndUpdates;
