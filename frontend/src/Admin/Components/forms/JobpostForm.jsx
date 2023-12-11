import React from "react";

import EditAdminPopupHeader from "../EditAdminPopupHeader";

const JobPost = ({ editHandler, componentType }) => {
  const closeHandler = () => {
    editHandler(componentType, false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <EditAdminPopupHeader closeHandler={closeHandler} title={componentType} />
      <div className="container">
        <div className="row p-4">
          <div className="col-md-8 offset-md-2 mb-5 mb-md-0">
            <form className="g-3 mb-md-0">
              <div className="mb-3 row">
                <label
                  htmlFor=""
                  className="col-sm-3 col-form-label text-start text-md-end"
                >
                  Location
                </label>
                <div className="col-sm-9">
                  <input type="text" className="form-control p-2" />
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
                  <input type="text" className="form-control p-2" />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor=""
                  className="col-sm-3 col-form-label text-start text-md-end"
                >
                  Sub Title
                </label>
                <div className="col-sm-9">
                  <input type="text" className="form-control p-2" />
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
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor=""
                  className="col-sm-3 col-form-label text-start text-md-end"
                >
                  Experience / Posted On
                </label>
                <div className="col-sm-4 mb-3">
                  <input type="number" className="form-control p-2" />
                </div>

                <div className="col-sm-5 mb-3">
                  <input type="date" className="form-control p-2" />
                </div>
              </div>

              <div className="row">
                <div className="text-center">
                  <button className="btn btn-secondary m-3">Clear</button>
                  <button className="btn btn-primary">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPost;
