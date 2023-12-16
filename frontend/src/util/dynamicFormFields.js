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
      type: "textarea",
      fieldName: "news_description",
    },
  };
};

export const getTestimonialsFields = (category) => {
  return {
    testimonial_title: {
      label: "Title",
      type: "text",
      fieldName: "testimonial_title",
    },
    testimonial_sub_title: {
      label: "Sub Title",
      type: "text",
      fieldName: "testimonial_sub_title",
    },
    testimonial_description: {
      label: "Description",
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
