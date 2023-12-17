import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Title from "../../Common/Title";

// Styles
import "./HomeNews.css";

import EditIcon from "../../Common/AdminEditIcon";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import ModelBg from "../../Common/ModelBg";
import { getBaseURL } from "../../util/ulrUtil";
import {
  getFormDynamicFields,
  getCarouselFields,
  getNewslFields,
} from "../../util/dynamicFormFields";
import AddEditAdminNews from "../../Admin/Components/News/index";
import {
  axiosClientServiceApi,
  axiosFileUploadServiceApi,
} from "../../util/axiosUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../Common/DeleteDialog";
import { getImagePath } from "../../util/commonUtil";

const HomeNews = ({ addNewsState }) => {
  const baseURL = getBaseURL();
  const editComponentObj = {
    news: false,
  };

  const pageType = "homeNew";
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);
  const [news, setNews] = useState([]);
  const [editNews, setEditNews] = useState({});

  const [obj, setObj] = useState({});
  const [showModel, setShowModel] = useState(false);
  const [showModelBg, setShowModelBg] = useState(false);

  const editHandler = (name, value, item) => {
    setEditNews(item);
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/appNews/clientAppNews/`,
        );
        if (response?.status == 200) {
          setNews(response.data.appNews);
        }
      } catch (error) {
        console.log("unable to access ulr because of server is down");
      }
    };
    if (!componentEdit.news || !addNewsState) {
      getNews();
    }
  }, [componentEdit.news, addNewsState]);

  /**
   *
   * Delete News
   */
  const DeleteNews = (id, name) => {
    const deleteImageByID = async () => {
      const response = await axiosFileUploadServiceApi.delete(
        `appNews/updateAppNews/${id}/`,
      );
      if (response.status == 204) {
        const list = news.filter((item) => item.id !== id);
        setNews(list);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteImageByID}
            message={`deleting the ${name} News?`}
          />
        );
      },
    });
  };

  const handleModel = (obj) => {
    setObj(obj)
    setShowModel(true)
    setShowModelBg(true)
  }

  const closeModel = () => {
    setShowModel(false)
    setShowModelBg(false)
  }

  return (
    <>
      {news.length > 0 ? news.map((item, index) => (
        <div className="col-sm-6 col-md-3 mb-4 mb-md-0" key={item.id}>
          <div className="card homeNews">
            {/* Edit News */}
            {isAdmin ? (
              <div className="d-flex justify-content-end gap-2">
              {/* <EditIcon editHandler={() => editHandler("news", true, item)} /> */}

              <Link
                  onClick={() => editHandler("news", true, item)}
                  className=" p-2"
                >
                  <i
                    className="fa fa-pencil fs-5 text-warning"
                    aria-hidden="true"
                  ></i>
                </Link>

              <Link
                  onClick={(event) => DeleteNews(item.id, item.news_title)}
                  className=" p-2"
                >
                  <i
                    className="fa fa-trash-o fs-5 text-danger"
                    aria-hidden="true"
                  ></i>
                </Link>
                </div>
            ) : (
              ""
            )}

{/* {isAdmin ? (
              <div className="text-end deleteNews">
                <Link
                  onClick={(event) => DeleteNews(item.id, item.news_title)}
                  className="bg-danger p-2 rounded"
                >
                  <i
                    className="fa fa-trash-o fs-5 text-white"
                    aria-hidden="true"
                  ></i>
                </Link>
              </div>
            ) : (
              ""
            )} */}
            <img
              src={ getImagePath(item.path)}
              className="img-fluid"
              alt={item.alternitivetext}
            />
            <div className="card-body p-4">
              <Title
                title={item.news_title ? item.news_title : "Update news Title"}
                cssClass="fs-5 fw-bold lh-sm mb-2"
              />
              <p className="card-text mb-4 lineClamp">
                {item.news_description
                  ? item.news_description
                  : "update new description"}
              </p>
              <Link className="text-primary moreLink" onClick={() => handleModel(item)}>Read more</Link>
            </div>
          </div>
        </div>
      )) : <div className="text-center">
      <p className="text-center fs-4">There are no news items found. Please create news items.</p>
      {isAdmin ? "" :
      <Link to="/login" className="btn btn-primary fs-5" style={{width: "200px"}}>Login to Add News <i class="fa fa-plus mx-2" aria-hidden="true"></i> </Link>
        }
      </div>}

      {componentEdit.news ? (
        <div className="adminEditTestmonial">
          <AddEditAdminNews
            editHandler={editHandler}
            editCarousel={editNews}
            setEditCarousel={setEditNews}
            componentType="news"
            imageGetURL="appNews/createAppNews/"
            imagePostURL="appNews/createAppNews/"
            imageUpdateURL="appNews/updateAppNews/"
            imageDeleteURL="appNews/updateAppNews/"
            imageLabel="Add News Image"
            showDescription={false}
            showExtraFormFields={getNewslFields()}
          />
        </div>
      ) : (
        ""
      )}

      {showModel ? 
        <div className="newsModel bg-dark">
          <div className="newsModalWrapper p-3 p-md-5 py-md-4 bg-white shadow-lg">
            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom">
              <Title title={obj.news_title} cssClass="fw-bold fs-4" />
              <Link onClick={closeModel} className="text-danger text-uppercase">Close <i class="fa fa-times fs-5" aria-hidden="true"></i></Link>
            </div>
            <div>
              <img className="w-100" src={getImagePath(obj.path)} alt={obj.news_title} />
            </div>
            <div className="my-3 newsDetails">{obj.news_description}</div>
            </div>
        </div>
      : ""}
      {showModelBg && <ModelBg />}

      {show && <ModelBg />}
    </>
  );
};

export default HomeNews;
