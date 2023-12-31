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
  imageDimensionsJson,
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
import CustomPagination from "../../Common/CustomPagination";
import { paginationDataFormat } from "../../util/commonUtil";
import { sortCreatedDateByDesc } from "../../util/dataFormatUtil";

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
  const [showModal, setShowModal] = useState(false);
  const [obj, setObj] = useState({});

  const [paginationData, setPaginationData] = useState({})
  const [pageLoadResult, setPageloadResults] = useState(false)
  const [searchQuery, setSearchquery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    removeActiveClass();
  }, []);

  useEffect(() => {
    const id = document.getElementById("KnowledgeHubnavbarDropdown");
    if (id) {
      id.classList.add("active");
    }
  });
  

  const setResponseData = (data) => {
    setNews(data.results.length > 0 ? sortCreatedDateByDesc(data.results) : []);
    setPaginationData(paginationDataFormat(data))
    setCurrentPage(1)
  }


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
        {isAdmin ? (
          <div className="text-end mb-4">
            <Link
              to="#"
              className="btn btn-primary"
              onClick={() => editHandler("addNews", true)}
            >
              Add News
              <i className="fa fa-plus ms-2" aria-hidden="true"></i>
            </Link>
          </div>
        ) : (
          ""
        )}

        <div className="row mb-4">
          <div className="col-md-6">
            <Title title="News And Updates" cssClass="blue-900 fs-4 mb-4" />
          </div>
          <div className="col-md-6">
            <Search
              setObject={setResponseData}
              clientSearchURL={"/appNews/searchAppNews/"}
              adminSearchURL={"/appNews/createAppNews/"}
              clientDefaultURL={"/appNews/clientAppNews/"}
              searchfiledDeatails={"News Title / News Description"}
              setPageloadResults={setPageloadResults}
              setSearchquery={setSearchquery}
              searchQuery={searchQuery}
            />
          </div>
        </div>

        <div className="row mb-5">
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

          <HomeNews
            addNewsState={componentEdit.addNews}
            news={news}
            setNews={setResponseData}
            setPageloadResults={setPageloadResults}
          />
          <div>
          
        {paginationData?.total_count ? (
           <CustomPagination 
           paginationData={paginationData}  
           paginationURL={isAdmin ? '/appNews/createAppNews/':'/appNews/clientAppNews/'} 
           paginationSearchURL={searchQuery ? `appNews/searchAppNews/${searchQuery}/` : isAdmin ? '/appNews/createAppNews/': '/appNews/clientAppNews/'}
           searchQuery={searchQuery}
           setCurrentPage={setCurrentPage}
           currentPage={currentPage}
           setResponseData={setResponseData}
           pageLoadResult={pageLoadResult}/>
        ):''}
      </div>
        </div>
      </div>
      {showModal && <Model obj={obj} closeModel={closeModel} flag="news" />}
      {showModal && <ModelBg closeModel={closeModel} />}

      {show && <ModelBg />}
    </>
  );
};

export default NewsAndUpdates;
