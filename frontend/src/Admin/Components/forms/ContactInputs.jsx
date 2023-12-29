import React from "react";
import EditAdminPopupHeader from "../EditAdminPopupHeader";

const ContactInputs = ({ editHandler, componentType }) => {
  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <EditAdminPopupHeader closeHandler={closeHandler} title={componentType} />
      <div className="container">
        <div className="row py-0 pb-md-5">
          <div className="col-md-8 offset-md-2 mb-5 mb-md-0">
            <form className="g-3 mb-md-0">
              <div className="mb-3 row">
                <label
                  htmlFor=""
                  className="col-sm-2 col-form-label text-start text-md-end"
                >
                  Phone
                </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control p-2" />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor=""
                  className="col-sm-2 col-form-label text-start text-md-end"
                >
                  Email
                </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control p-2" />
                </div>
              </div>

              <div className="text-center mt-5">
                <button className="btn btn-secondary mx-3">Clear</button>
                <button className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactInputs;
