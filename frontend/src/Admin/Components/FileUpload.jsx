import React, { useEffect, useState } from "react";
import Title from "../../Common/Title";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { getBaseURL } from "../../util/ulrUtil";
import { getCookie } from "../../util/cookieUtil";
import { axiosFileUploadServiceApi } from "../../util/axiosUtil";
import Button from "../../Common/Button";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
);

const FileUpload = ({
  title,
  project,
  updated_By,
  category,
  gallerysetState,
  galleryState,
  saveState,
  validTypes,
  disabledFile = false,
  descriptionTitle,
  titleTitle,
  showDescription = false,
  maxFiles,
  buttonLable,
  editImage,
  setEditCarousel,
}) => {
  const [files, setFiles] = useState([]);
  const [extTypes, setExtTypes] = useState([]);
  const baseURL = getBaseURL();
  const accessToken = useState(getCookie("access"));
  const [imageDescription, setimageDescription] = useState("");
  const [imageTitle, setimageTitle] = useState("");
  const [imagePath, setimagePath] = useState("");
  const [editImg, setEditimg] = useState(editImage);

  useEffect(() => {
    let extArr = validTypes.split(",");
    setExtTypes(extArr);
  }, [validTypes]);

  const onprocessfile = (error, file) => {
    if (!error) {
      const response = JSON.parse(file.serverId);
      const imageResponse = response.imageModel;
      const img = {
        id: imageResponse.id,
        originalname: imageResponse.originalname,
        path: imageResponse.path,
        contentType: imageResponse.contentType,
      };
      gallerysetState([...galleryState, img]);
      setFiles([]);
    }
  };
  useEffect(() => {
    setimageDescription(editImage.imageDescription);
    setimageTitle(editImage.imageTitle);
    setimagePath(editImage.path);
    setEditimg(editImage);
  }, [editImage]);

  useEffect(() => {
    if (files.length > 0 && !showDescription) {
      uploadFile();
    }
  }, [files, showDescription]);

  const setFormData = (formData) => {
    formData.append("projectID", project?.id);
    formData.append("category", category);
    formData.append("imageTitle", imageTitle);
    formData.append("imageDescription", imageDescription);
    formData.append("created_by", getCookie("userName"));
    formData.append("updated_By", getCookie("userName"));
    return formData;
  };

  /**
   *
   * Create dynamic file image
   */
  const creteFileObj = async () => {
    let response = await fetch(`${baseURL}${imagePath}`);
    let data = await response.blob();
    let metadata = {
      type: `image/${editImg.contentType.replace(".", "")}`,
    };
    return new File([data], editImg.originalname, metadata);
  };
  /**
   * update image
   */
  const updatetheImage = async () => {
    try {
      let formData = new FormData();
      if (files.length > 0) {
        formData.append("path", files[0].file);
      } else {
        let file = await creteFileObj();
        formData.append("path", file);
      }

      formData.append("id", editImg.id);
      formData = setFormData(formData);
      const response = await axiosFileUploadServiceApi.patch(
        `/gallery/updateGalleryDetails/${editImg.id}/`,
        formData,
      );
      if (response?.status === 200) {
        updatedFileChnages([response]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Post new images
   */
  const postImages = async () => {
    const arrURL = [];
    files.forEach((element, index) => {
      let formData = new FormData();
      formData.append("path", element.file);
      formData = setFormData(formData);
      arrURL.push(
        axiosFileUploadServiceApi.post(`/gallery/createGallery/`, formData),
      );
    });

    try {
      await Promise.all(arrURL).then(function (values) {
        updatedFileChnages(values);
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Onclick call the upload funciton
   */
  const uploadFile = async () => {
    const arrURL = [];
    saveState(true);

    if (editImg?.id) {
      updatetheImage();
    } else {
      postImages();
    }
  };

  /**
   *
   * After successfully update images
   */
  const updatedFileChnages = (response) => {
    const imgarr = [];
    response.forEach((item, i) => {
      const imageResponse = item.data.imageModel;
      const img = {
        id: imageResponse.id,
        originalname: imageResponse.originalname,
        path: imageResponse.path,
        contentType: imageResponse.contentType,
      };
      imgarr.push(img);
    });

    gallerysetState([...galleryState, ...imgarr]);
    resetFileUploadForm();
  };

  useEffect(() => {
    resetFileUploadForm();
  }, [galleryState]);

  /**
   * Reset form
   */
  const resetFileUploadForm = () => {
    setimageDescription("");
    setimageTitle("");
    setimagePath("");
    saveState(false);
    setFiles([]);
    setEditCarousel({});
  };

  const onerror = (error) => {
    if (error.type) {
      console.log("error upload fil");
    }
  };
  const changeHandler = (e) => {
    setimageDescription(e.target.value);
  };

  const changeTitleHandler = (e) => {
    setimageTitle(e.target.value);
  };

  const clearField = () => {
    resetFileUploadForm();
  };

  return (
    <>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label text-start text-md-end">
          <Title title={title} cssClass="" />
        </label>
        <div className="col-sm-10">
          <div className="border border-3 mb-0 shadow-lg">
            <FilePond
              labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>'
              labelInvalidField="invalid files"
              name="path"
              files={files}
              onerror={onerror}
              onupdatefiles={setFiles}
              allowMultiple={true}
              maxFiles={maxFiles ? maxFiles : 4}
              maxParallelUploads={4}
              disabled={disabledFile}
              credits={false}
              acceptedFileTypes={extTypes}
              instantUpload={false}
            />
          </div>
          {imagePath ? (
            <div>
              <img src={`${baseURL}${imagePath}`} alt="" className="" style={{width: "100%", height: "100px", objectFit: "cover"}} />
              {/* <span
                        onClick={() => thumbDelete(editImg.id, editImg.originalname)}
                      >
                        <i
                          className="fa fa-trash-o fs-4 text-danger"
                          aria-hidden="true"
                        ></i>
                      </span> */}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {showDescription ? (
        <>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label text-start text-md-end">
              {" "}
              <Title
                title={titleTitle ? titleTitle : "Title"}
                cssClass=""
              />
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                name="{imageTitle}"
                value={imageTitle}
                className="form-control p-2"
                onChange={(e) => changeTitleHandler(e)}
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label text-start text-md-end">
              <Title
                title={
                  descriptionTitle ? descriptionTitle : "Image desccription"
                }
                cssClass=""
              />
            </label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                name={"imageDescription"}
                value={imageDescription}
                onChange={(e) => changeHandler(e)}
                id="amenitiesDescription"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-sm-12 text-center ">
              <Button
                type="submit"
                cssClass="btn btn-secondary mx-3"
                label="Clear"
                handlerChange={clearField}
              />
              <Button
                type="submit"
                cssClass="btn btn-success mx-2"
                label={buttonLable ? buttonLable : "upload Image"}
                handlerChange={uploadFile}
              />
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default FileUpload;
