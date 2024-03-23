import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getCookie } from "../../../util/cookieUtil";
import {
  axiosClientServiceApi,
  axiosServiceApi,
} from "../../../util/axiosUtil";
import EditAdminPopupHeader from "../EditAdminPopupHeader";
import { InputField } from "./FormFields";
import Button from "../../../Common/Button";
import { Link } from "react-router-dom";

const FooterAdminFeilds = ({ editHandler, componentType, footerValues }) => {
  const [userName, setUserName] = useState("");
  const { register, reset, handleSubmit } = useForm({
    defaultValues: useMemo(() => {
      return footerValues;
    }, [footerValues]),
    mode: "onChange",
  });

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
    console.log(data, "data");
    let response = "";
    // try {
    //   if (data.id) {
    //     data["updated_by"] = userName;
    //     response = await axiosServiceApi.put(
    //       `/address/createAddress/${data.id}/`,
    //       data,
    //     );
    //   } else {
    //     // data["created_by"] = userName;
    //     response = await axiosServiceApi.post(`/address/createAddress/`, data);
    //     console.log("New Address", response)
    //   }

    //   if (response.status == 200 || response.status == 201) {
    //     reset(response.data.address[0]);
    //     toast.success(`Footer Values are updated successfully `);
    //     closeHandler();
    //   }
    // } catch (error) {
    //   console.log("unable to save the footer form");
    // }
  };

  return (
    <div className="">
      <EditAdminPopupHeader closeHandler={closeHandler} title={componentType} />
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <div className="row p-4">
            <div className="col-md-6 mb-md-0">
              <InputField label="Country" fieldName="address_dr_no" register={register} />
              <InputField label="State" fieldName="state" register={register} />
              <InputField label="City" fieldName="city" register={register} />
              <InputField label="Location" fieldName="location" register={register} />
              <InputField label="Street" fieldName="street" register={register} />
              <InputField label="Door Number" fieldName="address_dr_no" register={register} />
              
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
                label="WhatsApp No."
                fieldName="phonen_number_2"
                register={register}
              />
            </div>

            <div className="col-md-6 mb-md-0 px-5 text-black">
              
              <div className="row mb-4">
                <div className="col-8">
                  USA<br />
                  State <br />
                  City <br />
                  Location
                </div>

                <div className="col-4 d-flex justify-content-around align-items-center flex-md-row gap-3">
                      <Link
                        // onClick={(event) => handleCarouselEdit(event, item)}
                      >
                        <i
                          className="fa fa-pencil fs-4 text-warning"
                          aria-hidden="true"
                        ></i>
                      </Link>
                      <Link
                        // onClick={(event) =>
                        //   thumbDelete(
                        //     item.id,
                        //     getObjectTitle(componentType, item),
                        //   )
                        // }
                      >
                        <i
                          className="fa fa-trash fs-4 text-danger"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-8">
                  USA<br />
                  State <br />
                  City <br />
                  Location
                </div>

                <div className="col-4 d-flex justify-content-around align-items-center flex-md-row gap-3">
                      <Link
                        // onClick={(event) => handleCarouselEdit(event, item)}
                      >
                        <i
                          className="fa fa-pencil fs-4 text-warning"
                          aria-hidden="true"
                        ></i>
                      </Link>
                      <Link
                        // onClick={(event) =>
                        //   thumbDelete(
                        //     item.id,
                        //     getObjectTitle(componentType, item),
                        //   )
                        // }
                      >
                        <i
                          className="fa fa-trash fs-4 text-danger"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </div>
              </div>
              <hr />
             
             
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
                cssClass="btn border"
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

export default FooterAdminFeilds;
