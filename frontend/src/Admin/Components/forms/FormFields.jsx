import React from "react";
import RichTextEditor from "../../../Frontend/Components/RichTextEditor";
import { ErrorMessage } from "@hookform/error-message";
import _ from "lodash/fp";

export const InputFields = ({
  label,
  type = "text",
  fieldName,
  register,
  value,
  ...rest
}) => {
  switch (type) {
    case "text":
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
              value={value}
              type={type}
              className="form-control p-2"
            />
          </div>
        </div>
      );
    case "dropdown":
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
              {rest.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    case "textarea":
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
              value={value}
              rows="7"
            ></textarea>
          </div>
        </div>
      );
    case "hidden":
      return (
        <div className="mb-3 row">
          <input
            {...register(fieldName)}
            type={type}
            value={value}
            className="form-control p-2"
          />
        </div>
      );
    default:
      return null;
  }
};

export const RichTextInputEditor = ({ label, editorSetState, initialText }) => {
  return (
    <div className="mb-3 row">
      {/* <label
        htmlFor=""
        className="col-sm-3 col-form-label text-start text-md-end text-capitalize"
      >
        {label}
      </label> */}
      <div className="col-sm-12">
        <p className="text-center fw-bold fs-5 pt-3 py-md-0">{label}</p>
        <RichTextEditor
          initialText={initialText ? initialText : ""}
          RichEditorState={editorSetState}
        />
      </div>
    </div>
  );
};

export const InputField = ({
  label,
  type = "text",
  fieldName,
  register,
  cssClass,
  validationObject,
  error,
}) => {
  return (
    <div className="mb-3 row">
      <label
        htmlFor=""
        className={`col-sm-3 col-form-label text-start text-md-end text-capitalize ${
          cssClass ? cssClass : ""
        }`}
      >
        {label}
      </label>
      <div className="col-sm-9">
        <input
          {...register(fieldName, validationObject)}
          type={type}
          className="form-control p-2"
        />
        <span className="error">{error}</span>
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
          <option selected value="0">
            Choose...
          </option>
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

export const TextAreaField = ({
  label,
  fieldName,
  register,
  validationObject,
  error,
}) => {
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
          {...register(fieldName, validationObject)}
          rows="3"
        ></textarea>
        <span className="error">{error}</span>
      </div>
    </div>
  );
};
