import moment from "moment";
import { getBaseURL } from "./ulrUtil";
import { removeCookie, setCookie } from "./cookieUtil";

export const generateOptionLength = (values) => {
  return Array.from({ length: values }, (_, i) => i + 1);
};

export const showPosteddate = (dt) => {
  if (!dt) return 0;
  const postD = moment(moment(dt).format("YYYY-MM-DD"));
  const currentD = moment();
  return currentD.diff(postD, "days");
};

export const getDateValue = (dt) => {
  return moment(dt).format("DD-MM-YYYY");
};

export const getImagePath = (path) => {
  const baseURL = getBaseURL();
  return `${baseURL}${path}`;
};

export const getObjectTitle = (type, item) => {
  const carouse_Field = "carouse_title";
  const testimonial_Field = "testimonial_title";
  return type === "testmonial" ? item[testimonial_Field] : item[carouse_Field];
};

export const getObjectSubtitle = (type, item) => {
  const carouse_Field = "carouse_description";
  const testimonial_Field = "testimonial_sub_title";

  return type === "testmonial" ? item[testimonial_Field] : item[carouse_Field];
};

export const getObjectDescription = (type, item) => {
  const carouse_Field = "carouse_sub_title";
  const testimonial_Field = "testimonial_description";
  return type === "testmonial" ? item[testimonial_Field] : item[carouse_Field];
};


export const storeServiceMenuValueinCookie = (item) => {
  removeCookie("pageLoadServiceID")
  removeCookie("pageLoadServiceName")
  setCookie("pageLoadServiceID", item.id);
  setCookie("pageLoadServiceName", urlStringFormat(item.services_page_title));
}

export const urlStringFormat = (str) => {
  if(!str) return null;
  return str.replace(/\s+/g, '-').toLowerCase()
}