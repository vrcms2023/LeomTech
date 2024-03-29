import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getCookie } from "../../../util/cookieUtil";
import { axiosServiceApi } from "../../../util/axiosUtil";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import { InputField } from "./FormFields";
import Button from "../../../Common/Button";
import { Link } from "react-router-dom";
import DeleteDialog from "../../../Common/DeleteDialog";
import { confirmAlert } from "react-confirm-alert";
import _ from "lodash";
import { fieldValidation } from "../../../util/validationUtil";

const AddressForm = ({ editHandler, componentType, addressList }) => {
  const [userName, setUserName] = useState("");
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});
  const [listofAddress, setListofAddress] = useState(addressList);
  const [editAddress, setEditAddress] = useState(addressList[0]);

  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    setUserName(getCookie("userName"));
  }, []);

  const handleCarouselEdit = (event, address) => {
    event.preventDefault();
    setEditAddress(address);
    const fieldKeys = Object.keys(address);
    fieldKeys.forEach((item) => {
      setValue(item, address[item]);
    });
  };

  /**
   *
   * Delete image
   */
  const thumbDelete = (id, name) => {
    const deleteImageByID = async () => {
      const response = await axiosServiceApi.delete(
        `address/updateAddress/${id}/`
      );
      if (response.status == 204) {
        const list = listofAddress.filter((item) => item.id !== id);
        setListofAddress(list);
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

  /**
   * Save Footer values
   */
  const onSubmit = async (data) => {
    let response = "";
    try {
      if (data.id) {
        data["updated_by"] = userName;
        response = await axiosServiceApi.put(
          `/address/updateAddress/${data.id}/`,
          data
        );
      } else {
        // data["created_by"] = userName;
        response = await axiosServiceApi.post(`/address/createAddress/`, data);
        console.log("New Address", response);
      }

      if (response.status == 200 || response.status == 201) {
        reset();
        toast.success(`Address Values are updated successfully `);
        updateAddressList(response.data.addressList);
      }
    } catch (error) {
      console.log("unable to save the footer form");
    }
  };

  const updateAddressList = (data) => {
    const valueExit = _.some(addressList, function (o) {
      return _.includes(o, data.id);
    });
    if (!valueExit) {
      let list = [...listofAddress];
      list.push(data);
      setListofAddress(list);
    }
  };

  return (
    <div className="">
      <EditAdminPopupHeader closeHandler={closeHandler} title={componentType} />
      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-md-0">
              <InputField
                label="Country"
                fieldName="location_title"
                register={register}
                validationObject={fieldValidation.location_title}
                error={errors?.location_title?.message}
              />
              <InputField label="State" fieldName="state" register={register} />
              <InputField
                label="City"
                fieldName="city"
                register={register}
                validationObject={fieldValidation.city}
                error={errors?.city?.message}
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
              <InputField
                label="Door Number"
                fieldName="address_dr_no"
                register={register}
              />
              {/* <InputField
                label="Postcode"
                fieldName="postcode"
                register={register}
                validationObject={fieldValidation.postcode}
                error={errors?.postcode?.message}
              /> */}
              <InputField
                label="Email"
                fieldName="emailid"
                register={register}
                validationObject={fieldValidation.emailid}
                error={errors?.emailid?.message}
              />
              <InputField
                label="Phone"
                fieldName="phonen_number"
                register={register}
                validationObject={fieldValidation.phonen_number}
                error={errors?.phonen_number?.message}
              />
              <InputField
                label="WhatsApp No."
                fieldName="phonen_number_2"
                register={register}
                validationObject={fieldValidation.phonen_number_2}
                error={errors?.phonen_number_2?.message}
              />
            </div>

            <div className="col-md-6 mb-md-0 px-5 text-black">
              {listofAddress.length > 0 ? (
                listofAddress.map((item, index) => (
                  <>
                    <div className="row" key={index}>
                      <div className="col-8">
                        <p className="m-0 fw-bold">{item.location_title}</p>
                        <small>
                          {item.city} - {item.postcode}
                        </small>{" "}
                        <br />
                        <small>{item.state} </small>
                      </div>

                      <div className="col-4 d-flex justify-content-around align-items-center flex-md-row gap-3">
                        <Link
                          onClick={(event) => handleCarouselEdit(event, item)}
                        >
                          <i
                            className="fa fa-pencil fs-4 text-warning"
                            aria-hidden="true"
                          ></i>
                        </Link>
                        <Link
                          onClick={(event) =>
                            thumbDelete(item.id, item.location_title)
                          }
                        >
                          <i
                            className="fa fa-trash fs-4 text-danger"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>
                    </div>
                    <hr className="text-muted" />
                  </>
                ))
              ) : (
                <h4 className="text-center m-5 text-warning">
                  No Contacts found.
                </h4>
              )}
            </div>
          </div>
          <div className="row">
            <div className="d-flex justify-content-center align-items-center gap-1 gap-md-3 mb-4">
              <button type="reset" className="btn btn-secondary">
                Clear
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <Button
                type="submit"
                cssClass="btn btn-outline"
                label={"Close"}
                handlerChange={closeHandler}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
