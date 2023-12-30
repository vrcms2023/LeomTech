import React, { useState, useEffect } from "react";

// Components

import Title from "../../Common/Title";
import Model from "../../Common/Model";
import EditIcon from "../../Common/AdminEditIcon";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import News from "../Components/News";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { removeActiveClass } from "../../util/ulrUtil";
import {
  getFormDynamicFields,
  getCarouselFields,
  getNewslFields,
  imageDimensionsJson
} from "../../util/dynamicFormFields";
import ModelBg from "../../Common/ModelBg";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import AddEditAdminNews from "../../Admin/Components/News/index";
import Banner from "../../Common/Banner";

// Styles
import "./NewsAndUpdates.css";
import { Link } from "react-router-dom";
import AdminBanner from "../../Admin/Components/forms/ImgTitleIntoForm-List";
import HomeNews from "../Components/HomeNews";
import Search from "../../Common/Search";

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

      <div className="container my-4 newsAndUpdates">
        <div className="row">
          <div className="col-12 d-flex justify-content-end align-items-center">
        {isAdmin ? (
                <Link
                  to="#"
                  className="btn btn-primary d-flex justify-content-center align-items-center gap-3"
                  onClick={() => editHandler("addNews", true)}
                >
                  <span className="d-none d-md-block">Add News</span>
                  <i className="fa fa-plus fs-5" aria-hidden="true"></i>
                </Link>
            ) : (
              ""
            )}
            </div>
        </div>
        <div className="row">
          <div className="d-flex justify-content-between flex-column flex-md-row my-4">
            <div className="col-md-4">
              <Title title="News And Updates" cssClass="blue-900 fs-4 mb-4" />
            </div>
            <div className="col-md-5 mb-4">
              <Search setObject={setNews}
                clientSearchURL={'/appNews/searchAppNews/'}
                adminSearchURL={'/appNews/createAppNews/'}
                clientDefaultURL={'/appNews/clientAppNews/'}
                searchfiledDeatails={'News title / News description'}
              />
            </div>
          </div>

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
                showDescription={false}
                showExtraFormFields={getNewslFields("addNews")}
                dimensions={imageDimensionsJson("addNews")}
              />
            </div>
          ) : (
            ""
          )}
          

          <HomeNews addNewsState={componentEdit.addNews} news={news} setNews={setNews}/>
        </div>
      </div>
      {showModal && <Model obj={obj} closeModel={closeModel} flag="news" />}
      {showModal && <ModelBg closeModel={closeModel} />}

      {show && <ModelBg />}
    </>
  );
};

export default NewsAndUpdates;
