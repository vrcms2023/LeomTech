import React, { useState, useEffect } from "react";

// Components 

import Title from "../../Common/Title";
import Model from "../../Common/Model";
import EditIcon from "../../Common/AdminEditIcon";
import ImageInputsForm from "../../Admin/Components/forms/ImgTitleIntoForm";
import News from "./News";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { removeActiveClass } from "../../util/ulrUtil";
import ModelBg from "../../Common/ModelBg";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";

import Banner from "../../Common/Banner";

// Styles
import "./NewsAndUpdates.css";

// Images Imports
import NewsBanner from '../../Images/Banner_8.jpg'

const NewsAndUpdates = () => {
  const editComponentObj = {
    banner: false,
    news: false,
  };
  const [news, setNews] = useState([]);
  const [show, setShow] = useState(false);
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const isAdmin = useAdminLoginStatus();

  useEffect(() => {
    removeActiveClass();
  }, []);

  useEffect(() => {
    const getNews = async () => {
      try{
      const response = await axiosClientServiceApi.get(
        `/appNews/clientAppNews/`,
      );
      if (response?.status == 200) {
        setNews(response.data.appNews);
      }
    }catch(error){
      console.log("unable to access ulr because of server is down")
    }
    };
    getNews();
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

  const dateFormat = (date) => {
    let datestring = date;
    return datestring.slice(0, 10);
  };

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  }
  return (
    <>
      {/* Page Banner Component */}
      <div className="position-relative">
        {isAdmin ? <EditIcon editHandler={() => editHandler("banner", true)} /> : "" }
         <Banner bannerImg={NewsBanner} alt="About LeomTech" title={'Leom Tech'} caption={'IT Consulting Services'}/>
      </div>

      <div className="container my-4 newsAndUpdates">
        <div className="row">
          <Title title="News And Updates" cssClass="blue-900 fs-4 mb-4" />
          {news?.length > 0 &&
            news.map((item) => (
              <News
                item={item}
                dateFormat={dateFormat}
                key={item.id}
                articleHandler={articleHandler}
              />
            ))}
        </div>
      </div>
      {showModal && <Model obj={obj} closeModel={closeModel} flag="news" />}
      {showModal && <ModelBg closeModel={closeModel} />}


      {componentEdit.banner ? 
        <div className='container position-fixed adminEditTestmonial p-1'>
          <ImageInputsForm editHandler={editHandler} componentType="banner" />
        </div>
      : ""}
      
      {show && <ModelBg />}
    </>
  );
};

export default NewsAndUpdates;
