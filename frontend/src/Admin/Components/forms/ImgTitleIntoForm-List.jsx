import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBaseURL } from "../../../util/ulrUtil";

import FileUpload from "../../Components/FileUpload";
import EditAdminPopupHeader from "../EditAdminPopupHeader";

import Cimg1 from "../../../Images/carousel1.jpg";
import { getCookie } from "../../../util/cookieUtil";
import { axiosFileUploadServiceApi } from "../../../util/axiosUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../../Common/DeleteDialog";

const AdminBanner = ({ editHandler, componentType }) => {
  const projectID = "a62d7759-a e6b-4e49-a129-1ee208c6789d";
  const [userName, setUserName] = useState("");
  const [imgGallery, setImgGallery] = useState([]);
  const [saveState, setSaveState] = useState(false);
  const [carousel, setcarouseData] = useState([]);
  const [project, setProject] = useState({ id: projectID });
  const baseURL = getBaseURL();
  const [editCarousel, setEditCarousel] = useState({});
  const baseurl = getBaseURL();

  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  useEffect(() => {
    const getCarouselData = async () => {
      try {
        const response = await axiosFileUploadServiceApi.get(
          `/carousel/createCarousel/`,
        );
        if (response?.status === 200) {
          setcarouseData(response.data.fileData).reverse();
        }
      } catch (e) {
        console.log("unable to access ulr because of server is down");
      }
    };

    getCarouselData();
  }, [imgGallery]);

  const handleNewsEdit = (event, carousel) => {
    event.preventDefault();
    setEditCarousel(carousel);
  };

  /**
   *
   * Delete image
   */
  const thumbDelete = (id, name) => {
    const deleteImageByID = async () => {
      const response = await axiosFileUploadServiceApi.delete(
        `/carousel/updateCarousel/${id}/`,
      );
      if (response.status == 204) {
        const list = imgGallery.filter((item) => item.id !== id);
        setImgGallery(list);
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteImageByID}
            message={`deleting the ${name} image?`}
          />
        );
      },
    });
  };

  return (
    <div className="bg-white h-100">
      <EditAdminPopupHeader closeHandler={closeHandler} title={componentType} />
      <div className="container">
        <div className="row py-0 pb-md-5">
          <div className="col-md-6 mb-5 mb-md-0">
            <FileUpload
              title="Add carousel Images"
              project={project}
              updated_by={userName}
              category="carousel"
              gallerysetState={setImgGallery}
              maxFiles={1}
              galleryState={imgGallery}
              validTypes="image/png,image/jpeg"
              descriptionTitle="Caption"
              titleTitle="Title"
              alternitivetextTitle="Alt text"
              saveState={setSaveState}
              showDescription={true}
              buttonLable="Save"
              editImage={editCarousel}
              setEditCarousel={setEditCarousel}
              imagePostURL={"carousel/createCarousel/"}
              imageUpdateURL={"carousel/updateCarousel/"}
            />
          </div>
          <div
            className="col-md-6 mt-3 mt-md-0 overflow-auto"
            style={{ maxHeight: "450px" }}
          >
            <div className="container">
              {carousel?.map((item, index) => (
                <div className="row mb-4 slideItem" key={index}>
                  <div className="col-4 col-md-2">
                    <img
                      src={`${baseURL}${item.path}`}
                      alt=""
                      className="w-100"
                    />
                  </div>
                  <div className="col-6 col-md-8 ">
                    <h6 className="fw-bold m-0 fs-6">{item.imageTitle}</h6>
                    <small className="description text-muted d-none d-md-block">
                      {item.imageDescription}
                    </small>
                  </div>
                  <div className="col-2 col-md-2 d-flex justify-content-between align-items-center flex-column flex-md-row">
                    <Link onClick={(event) => handleNewsEdit(event, item)}>
                      <i
                        className="fa fa-pencil fs-4 text-warning"
                        aria-hidden="true"
                      ></i>
                    </Link>
                    <Link
                      onClick={(event) => thumbDelete(item.id, item.imageTitle)}
                    >
                      <i
                        className="fa fa-trash fs-4 text-danger"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBanner;
