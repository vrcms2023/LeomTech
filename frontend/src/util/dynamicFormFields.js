export const getFormDynamicFields = (pageType) => {
  return {
    imageTitle: {
      label: "Title",
      type: "text",
      fieldName: "imageTitle",
    },
    bannerTitle: {
      label: "Sub Title",
      type: "text",
      fieldName: "bannerTitle",
    },
    imageDescription: {
      label: "Description",
      type: "textarea",
      fieldName: "imageDescription",
    },
    pageType: {
      label: "News Title",
      readonly: true,
      type: "hidden",
      value: pageType ? pageType : "",
      fieldName: "pageType",
    },
  };
};

export const getCarouselFields = () => {
  return {
    imageTitle: {
      label: "Title",
      type: "text",
      fieldName: "imageTitle",
    },
    bannerTitle: {
      label: "Sub Title",
      type: "text",
      fieldName: "bannerTitle",
    },
    imageDescription: {
      label: "Description",
      type: "textarea",
      fieldName: "imageDescription",
    },
    carouseTitle: {
      label: "Carouse Title",
      type: "text",
      fieldName: "carouseTitle",
    },
  };
};

export const getTestimonialsFields = () => {
  return {
    imageTitle: {
      label: "Title",
      type: "text",
      fieldName: "imageTitle",
    },
    bannerTitle: {
      label: "Sub Title",
      type: "text",
      fieldName: "bannerTitle",
    },
    imageDescription: {
      label: "Description",
      type: "textarea",
      fieldName: "imageDescription",
    },
    testimonialTitle: {
      label: "Testimonial Title",
      type: "text",
      fieldName: "testimonialTitle",
    },
  };
};

export const getServiceFormFields = (id) => {
  return {
    feature_title: {
      label: "Service Title",
      type: "text",
      fieldName: "feature_title",
      defaultValue: "",
    },
    feature_sub_title: {
      label: "Service Sub Title",
      type: "text",
      fieldName: "feature_sub_title",
      defaultValue: "",
    },
    feature_description: {
      label: "Description",
      type: "richText",
      fieldName: "feature_description",
    },
    serviceID: {
      label: "News Title",
      readonly: true,
      type: "hidden",
      defaultValue: id ? id : "",
      fieldName: "serviceID",
    },
  };
};
