import moment from "moment";

export const dataFormatedByCatergoryName = (data) => {
  const project = data.projectList;
  const images = data.imageList;
  const projList = [];

  const list = project.reduce((acc, val, ind) => {
    const imgs = [];
    images.forEach((el, i) => {
      if (el.projectID === val.id) {
        imgs.push(el);
      }
    });
    return acc.concat({ ...val, imgs });
  }, []);

  list.map((proj) => {
    if (!projList[proj.projectCategoryValue]) {
      projList[proj.projectCategoryValue] = [];
    }
    projList[proj.projectCategoryValue].push(proj);
  });
  return projList;
};

export const getImagesByDate = (img) => {
  const imgByDate = [];
  const sortedImageArray = img.sort(
    (a, b) =>
      new moment(b.updated_at).valueOf() - new moment(a.updated_at).valueOf(),
  );
  sortedImageArray.map((img) => {
    const dt = new moment(img.updated_at).format("YYYY/DD/MM");
    if (!imgByDate[dt]) {
      imgByDate[dt] = [];
    }
    imgByDate[dt].push(img);
  });
  return imgByDate;
};

export const sortByDate = (array) => {
  return array.sort(function (a, b) {
    return new Date(b.created_at) - new Date(a.created_at);
  });
};

export const getFirstShortDescription = (data) => {
  return data.substring(0, 50);
};

export const mapServicePagetoComponent = (data) => {
  const services = data.services;
  const serviceSection = data.serviceSection;
  const displayCount = 5

  return services.reduce((acc, val, ind) => {
    const service = [];
    if(ind >= displayCount) return acc.concat({ ...val, service });
    serviceSection.forEach((el, i) => {
      if (el.serviceID === val.id && service.length === 0) {
        service.push(el);
      }
    });
    return acc.concat({ ...val, service });
  }, []);

};
