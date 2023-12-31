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

export const getAboutUSSectionFields = () => {
  return {
    aboutus_title: {
      label: "Title",
      type: "text",
      fieldName: "aboutus_title",
    },
    aboutus_sub_title: {
      label: "Sub Title",
      type: "text",
      fieldName: "aboutus_sub_title",
    },
    aboutus_description: {
      label: "Description",
      type: "richText",
      fieldName: "aboutus_description",
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

export const getServiceFormFields = (id, title) => {
  console.log("title", title);
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
      label: "hidden",
      readonly: true,
      type: "hidden",
      value: id ? id : "",
      fieldName: "serviceID",
    },
    services_page_title: {
      label: "hidden",
      readonly: true,
      type: "hidden",
      value: title ? title : "",
      fieldName: "services_page_title",
    },
  };
};
export const imageDimensionsJson = (component) => {
  const imgDimension = {
    carousel: {
      w: "1500px",
      h: "760px",
    },
    aboutus: {
      w: "400px",
      h: "400px",
    },
    whoweare: {
      w: "800px",
      h: "800px",
    },
    homeCareers: {
      w: "800px",
      h: "800px",
    },
    addService: {
      w: "800px",
      h: "800px",
    },
    addNews: {
      w: "300px",
      h: "200px",
    },
    banner: {
      w: "1500px",
      h: "400px",
    },
  };
  return imgDimension[component];
};
