export const getFormDynamicFields = (pageType) => {
  return {
    banner_title: {
      label: "Title",
      type: "text",
      fieldName: "banner_title",
    },
    banner_subTitle: {
      label: "Sub Title",
      type: "text",
      fieldName: "banner_subTitle",
    },
    banner_descripiton: {
      label: "Description",
      type: "textarea",
      fieldName: "banner_descripiton",
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

export const getAboutUSSectionFields = (pageType) => {
  return {
    banner_title: {
      label: "Title",
      type: "text",
      fieldName: "banner_title",
    },
    banner_subTitle: {
      label: "Sub Title",
      type: "text",
      fieldName: "banner_subTitle",
    },
    banner_descripiton: {
      label: "Description",
      type: "richText",
      fieldName: "banner_descripiton",
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

export const getCarouselFields = (category) => {
  return {
    carouse_title: {
      label: "Carouse Title",
      type: "text",
      fieldName: "carouse_title",
    },
    carouse_sub_title: {
      label: "Carouse Sub Title",
      type: "text",
      fieldName: "carouse_sub_title",
    },
    carouse_description: {
      label: "Description",
      type: "textarea",
      fieldName: "carouse_description",
    },
    category: {
      label: "News Title",
      readonly: true,
      type: "hidden",
      value: category ? category : "",
      fieldName: "category",
    },
  };
};

export const getNewslFields = () => {
  return {
    news_title: {
      label: "News Title",
      type: "text",
      fieldName: "news_title",
    },

    news_description: {
      label: "Description",
      type: "richText",
      fieldName: "news_description",
    },
  };
};

export const getTestimonialsFields = (category) => {
  return {
    testimonial_title: {
      label: "Testimonial Name",
      type: "text",
      fieldName: "testimonial_title",
    },
    testimonial_sub_title: {
      label: "Sub Title",
      type: "text",
      fieldName: "testimonial_sub_title",
    },
    testimonial_description: {
      label: "Testimonial Writeup",
      type: "textarea",
      fieldName: "testimonial_description",
    },
    category: {
      label: "News Title",
      readonly: true,
      type: "hidden",
      value: category ? category : "",
      fieldName: "category",
    },
  };
};

export const getServiceFormFields = (id) => {
  return {
    feature_title: {
      label: "Service Title",
      type: "text",
      fieldName: "feature_title",
    },
    feature_sub_title: {
      label: "Service Sub Title",
      type: "text",
      fieldName: "feature_sub_title",
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
      value: id ? id : "",
      fieldName: "serviceID",
    },
  };
};

// export const imageDimensionsJson = {
//   whoweare: {
//     width: "800px",
//     height: "800px",
//   },
// };

export const imageDimensionsJson = (type) => {
  if(type === "carousel") {
    return ( {"w": "1500px", "h": "760px"})
  }else if(type === "whoweare" || type === "homeCareers" || type === "addService") {
    return ( {"w": "800px", "h": "800px"})
  }else if(type === "testimonial" || type === "addBews") {
    return ( {"w": "500px", "h": "500px"})
  }
  else if(type === "banner") {
    return ( {"w": "1500px", "h": "400px"})
  }
  
}