import React, { useEffect, useState, useMemo } from "react";
import Title from "../../Common/Title";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import RichTextEditor from "../../Frontend/Components/RichTextEditor";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { getBaseURL } from "../../util/ulrUtil";
import { getCookie } from "../../util/cookieUtil";
import { axiosFileUploadServiceApi } from "../../util/axiosUtil";
import Button from "../../Common/Button";
import {
  InputField,
  InputFields,
  TextAreaField,
  RichTextInputEditor,
} from "./forms/FormFields";
import { getImagePath } from "../../util/commonUtil";
import Error from "./Error";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
);

const FileUpload = ({
  title,
  project,
  updated_by,
  category,
  gallerysetState,
  galleryState,
  saveState,
  validTypes,
  disabledFile = false,
  descriptionTitle = "Image desccription",
  titleTitle = "Title",
  alternitivetextTitle = "Alt Text",
  imageDescriptionFieldName = "imageDescription",
  imageTitleFieldName = "imageTitle",
  altTitleFieldName = "alternitivetext",
  showDescription = false,
  showExtraFormFields = [],
  maxFiles,
  buttonLable,
  editImage,
  setEditCarousel,
  imagePostURL = "/gallery/createGallery/",
  imageUpdateURL = "/gallery/updateGalleryDetails/",
  extraFormParamas = [],
}) => {
  const [files, setFiles] = useState([]);
  const [extTypes, setExtTypes] = useState([]);
  const [editorState, setEditorState] = useState("");

  const baseURL = getBaseURL();
  const [editImg, setEditimg] = useState({});
  const [error, setError] = useState("");

  const { register, reset, handleSubmit } = useForm({
    defaultValues: useMemo(() => {
      return editImage;
    }, [editImage]),
    mode: "onChange",
  });

  // useEffect(() => {
  //   setEditimg(editImage?.id ? editImage : {});
  // }, [editImage]);

  useEffect(() => {
    reset(editImage?.id ? editImage : {});
  }, [editImage]);

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
    if (
      files.length > 0 &&
      !showDescription &&
      showExtraFormFields.length > 0
    ) {
      uploadFile();
    }
  }, [files, showDescription, showExtraFormFields]);

  const setFormData = (formData, data) => {
    formData.append("projectID", project?.id);
    formData.append("category", category);
    formData.append("created_by", getCookie("userName"));
    formData.append("updated_by", getCookie("userName"));
    formData.append("imageTitle", "");
    formData.append("imageDescription", "");
    formData.append("alternitivetext", data.alternitivetext);

    if (showExtraFormFields) {
      for (const key in showExtraFormFields) {
        if (showExtraFormFields.hasOwnProperty(key)) {
          if (key === "feature_description") {
            formData.append("feature_description", editorState);
          } else {
            formData.append(key, data[key]);
          }
        }
      }
    }

    if (extraFormParamas.length > 0) {
      extraFormParamas.forEach((item) => {
        let key = Object.keys(item);
        let field = item[key];
        if (field.readonly) {
          formData.append(field.fieldName, field.defaultValue);
        }
      });
    }
    return formData;
  };

  /**
   *
   * Create dynamic file image
   */
  const creteFileObj = async () => {
    let response = await fetch(`${baseURL}${editImage.path}`);
    let data = await response.blob();
    let metadata = {
      type: `image/${editImage.contentType.replace(".", "")}`,
    };
    return new File([data], editImage.originalname, metadata);
  };
  /**
   * update image
   */
  const updatetheImage = async (data) => {
    try {
      let formData = new FormData();
      if (files.length > 0) {
        formData.append("path", files[0].file);
      } else {
        let file = await creteFileObj();
        formData.append("path", file);
      }

      formData.append("id", editImage.id);
      formData = setFormData(formData, data);

      const response = await axiosFileUploadServiceApi.patch(
        `${imageUpdateURL}${editImage.id}/`,
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
  const postImages = async (data) => {
    const arrURL = [];
    if (files.length > 0) {
      files.forEach((element, index) => {
        let formData = new FormData();
        formData.append("path", element.file);
        formData = setFormData(formData, data);
  
        arrURL.push(axiosFileUploadServiceApi.post(imagePostURL, formData));
      });
    } else {
      let formData = new FormData();
      formData.append("path", '');
      formData = setFormData(formData, data);
      arrURL.push(axiosFileUploadServiceApi.post(imagePostURL, formData));
    }
   

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
  const uploadFile = (data) => {
    const arrURL = [];
    saveState(true);
    if (editImage?.id) {
      updatetheImage(data);
    } else {
      postImages(data);
    }
  };

  /**
   *
   * After successfully update images
   */
  const updatedFileChnages = (response) => {
    const imgarr = [];
    response.forEach((item, i) => {
      const key = Object.keys(item.data);
      const imageResponse = item.data[key];
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
    //resetFileUploadForm();
  }, [galleryState]);

  /**
   * Reset form
   */
  const resetFileUploadForm = () => {
    reset();
    saveState(false);
    setFiles([]);
    setEditCarousel({});
  };

  const onerror = (error) => {
    if (error.type) {
      console.log("error upload fil");
    }
  };

  const clearField = () => {
    resetFileUploadForm();
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit(uploadFile)}>
        <div className="mb-3 row">
          <label className="col-sm-3 col-form-label text-start text-md-end">
            <Title title={title} cssClass="" />
          </label>
          <div className="col-sm-9">
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
            {editImage?.id ? (
              <div>
                <img
                  src={getImagePath(editImage.path, editImage.contentType)}
                  alt={editImage?.alternitivetext}
                  className=""
                  style={{ width: "100%", height: "100px", objectFit: "cover" }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <InputFields
          label={alternitivetextTitle}
          type="text"
          fieldName={altTitleFieldName}
          register={register}
        />

        <>
          {Object.keys(showExtraFormFields).map((e, index) => {
            const { label, type, fieldName, value } = showExtraFormFields[e];

            if (type == "richText") {
              return (
                <RichTextInputEditor
                  key={index}
                  label={label}
                  editorSetState={setEditorState}
                  initialText={
                    editImage?.feature_description
                      ? editImage?.feature_description
                      : ""
                  }
                />
                // <div className="mb-3 row" key={index}>
                //   <label
                //     htmlFor=""
                //     className="col-sm-3 col-form-label text-start text-md-end text-capitalize"
                //   >
                //     {label}
                //   </label>
                //   <div className="col-sm-9">
                //     <RichTextEditor
                //       initialText={editImage?.feature_description ? editImage?.feature_description :''  }
                //       RichEditorState={setEditorState}
                //     />
                //   </div>
                // </div>
              );
            } else {
              return (
                <InputFields
                  key={index}
                  label={label}
                  type={type}
                  value={value}
                  fieldName={fieldName}
                  register={register}
                />
              );
            }
          })}

          <div className="row">
            <div className="text-center ">
              <button
                type="button"
                className="btn btn-secondary mx-3"
                onClick={clearField}
              >
                Clear
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </>

        {showDescription ? (
          <>
            <InputField
              label={titleTitle}
              fieldName={imageTitleFieldName}
              register={register}
            />

            <TextAreaField
              label={descriptionTitle}
              fieldName={imageDescriptionFieldName}
              register={register}
            />
            <>
              {extraFormParamas.map((item, index) => {
                let key = Object.keys(item);
                let field = item[key];
                if (field.readonly) return "";
                return (
                  <InputField
                    key={index}
                    label={field.label}
                    type={field.type}
                    fieldName={field.fieldName}
                    register={register}
                  />
                );
              })}
            </>

            <div className="row">
              <div className="text-center ">
                <button
                  type="button"
                  className="btn btn-secondary mx-3"
                  onClick={clearField}
                >
                  Clear
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

export default FileUpload;
