import React from "react";

export const InputField = ({ label, type = "text", fieldName, register }) => {
  return (
    <div className="mb-3 row">
      <label
        htmlFor=""
        className="col-sm-3 col-form-label text-start text-md-end text-capitalize"
      >
        {label}
      </label>
      <div className="col-sm-9">
        <input
          {...register(fieldName)}
          type={type}
          className="form-control p-2"
        />
      </div>
    </div>
  );
};

export const SelectField = ({ label, fieldName, register, options }) => {
  return (
    <div className="mb-3 row">
      <label
        htmlFor=""
        className="col-sm-3 col-form-label text-start text-md-end text-capitalize"
      >
        {label}
      </label>
      <div className="col-sm-9">
        <select
          className="custom-select custom-select-lg form-control p-2"
          {...register(fieldName)}
        >
          <option selected>Choose...</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const TextAreaField = ({ label, fieldName, register }) => {
  return (
    <div className="mb-3 row">
      <label
        htmlFor=""
        className="col-sm-3 col-form-label text-start text-md-end"
      >
        {label}
      </label>
      <div className="col-sm-9">
        <textarea
          className="form-control"
          {...register(fieldName)}
          rows="3"
        ></textarea>
      </div>
    </div>
  );
};
