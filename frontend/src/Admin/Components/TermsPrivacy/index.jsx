import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import Button from "../../../Common/Button";
import { TextAreaField, RichTextInputEditor } from "../forms/FormFields";
import {
  axiosClientServiceApi,
  axiosServiceApi,
} from "../../../util/axiosUtil";
import { getCookie } from "../../../util/cookieUtil";

const AdminTermsAndPrivacy = ({
  editHandler,
  componentType,
  pageType,
  type,
}) => {
  const [userName, setUserName] = useState("");
  const { register, reset, handleSubmit } = useForm();
  const [termEditorState, setTermEditorState] = useState("");
  const [policyEditorState, setPolicyEditorState] = useState("");
  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };
  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  /**
   * Save Footer values
   */
  const onSubmit = async (data) => {
    let response = "";
    try {
      if (data.id) {
        data["updated_by"] = userName;
        response = await axiosServiceApi.put(
          `/footer/updateTermsAndCondition/${data.id}/`,
          data,
        );
      } else {
        data["created_by"] = userName;
        response = await axiosServiceApi.post(
          `/footer/createTermsAndCondition/`,
          data,
        );
      }

      if (response.status == 200) {
        reset(response.data.terms[0]);
        toast.success(`Footer Values are updated successfully `);
      }
    } catch (error) {
      console.log("unable to save the footer form");
    }
  };

  useEffect(() => {
    const getFooterValues = async () => {
      try {
        const response = await axiosClientServiceApi.get(
          `/footer/getTermsAndCondition/`,
        );
        if (response?.data?.terms?.length > 0) {
          reset(response.data.terms[0]);
        }
      } catch (error) {
        console.log("unable to save the terms and condition form");
      }
    };
    getFooterValues();
  }, []);

  return (
    <>
      <EditAdminPopupHeader
        closeHandler={closeHandler}
        title={componentType}
        type={type}
      />
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <div className="row p-4">
            <div className="col-md-8 offset-md-2">
              {/* <RichTextInputEditor  
                    label={'Terms And Conditions'}
                    editorSetState={termEditorState}
                    initialText={''} />
                <RichTextInputEditor  
                    label={'Privacy Policy'}
                    editorSetState={policyEditorState}
                    initialText={''} /> */}

              <TextAreaField
                label="Terms And Conditions"
                fieldName="terms_condition"
                register={register}
              />
              <TextAreaField
                label="Privacy Policy"
                fieldName="privacy_policy"
                register={register}
              />

              <div className="text-center mt-4">
                <button type="reset" className="btn btn-secondary mx-3">
                  Clear
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminTermsAndPrivacy;
