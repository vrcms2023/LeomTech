import React from "react";
import Button from "../../../Common/Button";

const AddService = () => {
  return (
    <div className="my-5">
      <h3 className="text-center">Add New Service</h3>

      <div className="container bg-light p-5 border shadow-lg">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <input
              type="text"
              class="form-control py-3"
              id=""
              placeholder="Add Service Name"
            />
            <button type="submit" class="btn btn-primary mt-2">
              Save
            </button>
            <hr className="my-5" />
            <span className="text-success text-center fw-bold py-2 fs-5 d-block">
              Successfully added the new service
            </span>
            <select
              class="form-select py-3"
              aria-label="Default select example"
            >
              <option selected>Open this select menu</option>
              <option value={" "}>IOT Services</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
