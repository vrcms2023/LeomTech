import React from "react";

const Title = ({ title, subTitle = "", cssClass }) => {
  return (
    <>
      <h3 className={`${cssClass} text-capitalize` }>
        {title}{" "}
        {subTitle ? (
          <span className={"fs-6 text-black fw-normal"}> / {subTitle}</span>
        ) : (
          ""
        )}
      </h3>
    </>
  );
};

export default Title;
