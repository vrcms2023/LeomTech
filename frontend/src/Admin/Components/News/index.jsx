import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosServiceApi } from "../../../util/axiosUtil";
import { getCookie } from "../../../util/cookieUtil";
import Button from "../../../Common/Button";

import EditAdminPopupHeader from "../EditAdminPopupHeader";

export const News = ({ editHandler, componentType, pageType }) => {
  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  const formObject = {
    intro_title: "",
    subTitle: "",
    intro_desc: "",
    intro_morelink: "",
    id: "",
    pageType: pageType,
  };
  const [introFormValue, setIntroFormValues] = useState(formObject);

  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  useEffect(() => {
    const getintroValues = async () => {
      try {
        let response = await axiosServiceApi.get(
          `/carousel/updateHomeIntro/${pageType}/`,
        );
        let value = updateResponseData(response.data.intro);
        setIntroFormValues(value);
      } catch (error) {
        toast.error("Unable to get the intro");
      }
    };
    getintroValues();
  }, []);

  const changeHandler = (e) => {
    setErrorMessage("");
    setIntroFormValues({ ...introFormValue, [e.target.name]: e.target.value });
  };

  const updateResponseData = (data) => {
    return {
      intro_title: data.intro_title,
      subTitle: data.subTitle,
      intro_desc: data.intro_desc,
      intro_morelink: data.intro_morelink,
      id: data.id,
      pageType: pageType,
    };
  };

  const saveandUpdateIntro = async () => {
    const intro = {
      intro_title: introFormValue.intro_title,
      subTitle: introFormValue.subTitle,
      intro_desc: introFormValue.intro_desc,
      intro_morelink: introFormValue.intro_morelink,
      pageType: pageType,
      updated_by: userName,
    };

    try {
      let response = "";
      if (introFormValue.id) {
        intro.updated_by = userName;
        response = await axiosServiceApi.put(
          `/carousel/updateHomeIntro/${pageType}/`,
          {
            ...intro,
          },
        );
      } else {
        intro.created_by = userName;
        response = await axiosServiceApi.post(`/carousel/createHomeIntro/`, {
          ...intro,
        });
      }
      setIntroFormValues(updateResponseData(response.data.intro));
    } catch (error) {
      toast.error("Unable to save the intro");
    }
  };

  // const resetForm = () => {
  //   setIntroFormValues(formObject)
  // }

  return (
    <>
      <EditAdminPopupHeader closeHandler={closeHandler} title={componentType} />
      <div className="container">
        <div className="row p-4">
          <div className="col-md-8 offset-md-2">
          <div className="mb-3 row">
                <label
                htmlFor=""
                className="col-sm-3 col-form-label text-start text-md-end"
                >
                Image
                </label>
                <div className="col-sm-9">
                {/* <FileUpload
                        title="Add carousel Images"
                        project={""}
                        updated_by={""}
                        category="carousel"
                        gallerysetState={""}
                        maxFiles={1}
                        galleryState={""}
                        validTypes="image/png,image/jpeg"
                        descriptionTitle="Caption"
                        titleTitle="Title"
                        alternitivetextTitle="Alt text"
                        saveState={""}
                        showDescription={true}
                        buttonLable="Save"
                        editImage={""}
                        setEditCarousel={""}
                        imagePostURL={""}
                        imageUpdateURL={""}
                    /> */}
                <input
                    name="intro_title"
                    value={introFormValue.intro_title ? introFormValue.intro_title : ""}
                    type="file"
                    className="form-control p-2"
                    onChange={changeHandler}
                />
                </div>
            </div>

            <div className="mb-3 row">
                <label
                htmlFor=""
                className="col-sm-3 col-form-label text-start text-md-end"
                >
                Title
                </label>
                <div className="col-sm-9">
                <input
                    name="intro_title"
                    value={introFormValue.intro_title ? introFormValue.intro_title : ""}
                    type="text"
                    className="form-control p-2"
                    onChange={changeHandler}
                />
                </div>
            </div>

      <div className="mb-3 row">
        <label
          htmlFor=""
          className="col-sm-3 col-form-label text-start text-md-end"
        >
          Description
        </label>
        <div className="col-sm-9">
          <textarea
            name="intro_desc"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="8"
            value={introFormValue.intro_desc ? introFormValue.intro_desc : ""}
            onChange={changeHandler}
          ></textarea>
        </div>
      </div>
      <div className="mb-3 row">
        <label
          htmlFor=""
          className="col-sm-3 col-form-label text-start text-md-end"
        >
          More link
        </label>
        <div className="col-sm-9">
          <input
            name="intro_morelink"
            value={
              introFormValue.intro_morelink ? introFormValue.intro_morelink : ""
            }
            type="text"
            onChange={changeHandler}
            className="form-control p-2"
          />
        </div>
      </div>

      <div className="text-center mt-5">
        {/* <Button
                type="submit"
                cssClass="btn btn-secondary mx-3"
                label={"clear"}
                handlerChange={resetForm}
              /> */}
        <Button
          type="submit"
          cssClass="btn btn-primary"
          label={"Save"}
          handlerChange={saveandUpdateIntro}
        />
      </div>

          </div>
        </div>
      
    </div>
    </>
  );
};

export default News;
