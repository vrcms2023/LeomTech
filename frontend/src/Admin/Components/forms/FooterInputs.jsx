import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getCookie } from "../../../util/cookieUtil";
import { axiosServiceApi } from "../../../util/axiosUtil";
import EditAdminPopupHeader from "../EditAdminPopupHeader";

const AddressTextArea = ({ editHandler, componentType }) => {
  const [userName, setUserName] = useState("");
  const { register, reset, handleSubmit } = useForm();

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
          `/footer/updateAddress/${data.id}/`,
          data,
        );
      } else {
        data["created_by"] = userName;
        response = await axiosServiceApi.post(`/footer/createAddress/`, data);
      }

      if (response.status == 200) {
        reset(response.data.address[0]);
        toast.success(`Footer Values are updated successfully `);
      }
    } catch (error) {
      console.log("unable to save the footer form");
    }
  };

  useEffect(() => {
    const getFooterValues = async () => {
      try {
        const response = await axiosServiceApi.get(`/footer/createAddress/`);
        if (response?.data?.address?.length > 0) {
          reset(response.data.address[0]);
        }
      } catch (error) {
        console.log("unable to save the footer form");
      }
    };
    getFooterValues();
  }, []);

  return (
    <div className="bg-white">
      <EditAdminPopupHeader closeHandler={closeHandler} title={componentType} />
      <form className="g-3 mb-md-0" onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <div className="row py-0 pb-md-5">
            <div className="col-md-6 mb-5 mb-md-0">
              <InputField
                label="Address"
                fieldName="address_dr_no"
                register={register}
              />
              <InputField
                label="Location"
                fieldName="location"
                register={register}
              />
              <InputField
                label="Street"
                fieldName="street"
                register={register}
              />
              <InputField label="City" fieldName="city" register={register} />
              <InputField label="State" fieldName="state" register={register} />
              <InputField
                label="Postcode"
                fieldName="postcode"
                register={register}
              />
              <InputField
                label="Email"
                fieldName="emailid"
                register={register}
              />
              <InputField
                label="Phone"
                fieldName="phonen_number"
                register={register}
              />
              <InputField
                label="Phone"
                fieldName="phonen_number"
                register={register}
              />
              <TextAreaField
                label="Terms Ccondition"
                fieldName="terms_condition"
                register={register}
              />
              <TextAreaField
                label="Privacy Policy"
                fieldName="privacy_policy"
                register={register}
              />
            </div>

            <div className="col-md-6 mb-5 mb-md-0">
              <InputField
                label="Facebook"
                fieldName="facebook_url"
                register={register}
              />
              <InputField
                label="Twitter"
                fieldName="twitter_url"
                register={register}
              />
              <InputField
                label="Linked In"
                fieldName="linkedIn_url"
                register={register}
              />
              <InputField
                label="You Tube"
                fieldName="youtube_url"
                register={register}
              />
              <InputField
                label="Instagram"
                fieldName="instagram_url"
                register={register}
              />
              <InputField
                label="Vimeo"
                fieldName="vimeo_url"
                register={register}
              />
              <InputField
                label="Pinterest"
                fieldName="pinterest_url"
                register={register}
              />
            </div>
          </div>
          <div className="row py-0 pb-md-5">
            <div className="text-center">
              <button className="btn btn-secondary mx-3">Clear</button>
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, fieldName, register }) => {
  return (
    <div className="mb-3 row">
      <label
        htmlFor=""
        className="col-sm-2 col-form-label text-start text-md-end text-capitalize"
      >
        {label}
      </label>
      <div className="col-sm-10">
        <input
          {...register(fieldName)}
          type="text"
          className="form-control p-2"
        />
      </div>
    </div>
  );
};

const TextAreaField = ({ label, fieldName, register }) => {
  return (
    <div className="mb-3 row">
      <label
        htmlFor=""
        className="col-sm-2 col-form-label text-start text-md-end"
      >
        {label}
      </label>
      <div className="col-sm-10">
        <textarea
          className="form-control"
          {...register(fieldName)}
          rows="3"
        ></textarea>
      </div>
    </div>
  );
};

export default AddressTextArea;
