import React, { useState } from "react";
import { Link } from "react-router-dom";

// Components
import Title from "../../Common/Title";

// Styles
import "./HomeServices.css";

import serviceImg1 from "../../Images/service1.png";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import ServiceForm from '../../Admin/Components/forms/ImgTitleIntoForm-List'
import ModelBg from "../../Common/ModelBg";
import EditIcon from "../../Common/AdminEditIcon";

const HomeServices = ({ title }) => {

  const editComponentObj = {
    service: false,
  };
  
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);

  

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  const [services, setServices] = useState([
    {
      img: "",
      title: "IOT Services",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      link: "#",
    },
    {
      img: "",
      title: "AI Services",
      description:
        "Adipiscing elit ut aliquam purus sit amet luctus. Risus feugiat in ante metus. Vitae semper quis lectus nulla at volutpat diam ut venenatis. Quis lectus nulla at volutpat diam. Interdum posuere lorem ipsum dolor sit. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt.",
      link: "#",
    },
    {
      img: "newsImg3",
      title: "Project Planning",
      description:
        "Ac tortor vitae purus faucibus. Varius morbi enim nunc faucibus a pellentesque. Aliquam etiam erat velit scelerisque in dictum non consectetur. In arcu cursus euismod quis viverra nibh. Justo laoreet sit amet cursus. Tincidunt vitae semper",
      link: "#",
    },
    {
      img: "newsImg4",
      title: "Project Development",
      description:
        "Adipiscing enim eu turpis egestas pretium aenean pharetra. Adipiscing vitae proin sagittis nisl rhoncus. Ultrices dui sapien eget mi proin. Iaculis at erat pellentesque adipiscing commodo. Congue nisi vitae suscipit tellus mauris. Libero id faucibus nisl tincidunt eget",
      link: "#",
    },
    {
      img: "newsImg4",
      title: "Project Support",
      description:
        "Iaculis eu non diam phasellus vestibulum lorem sed risus. Nunc aliquet bibendum enim facilisis gravida neque convallis a. In nibh mauris cursus mattis molestie a. Senectus et netus et malesuada fames ac turpis egestas. Quis vel eros donec ac.",
      link: "#",
    },
  ]);

  

  return (
    <>
      {services.map((item, index) => (
        <div className="row service mb-4" key={`${index}+homeService`}>
          <div className="position-relative">
          {isAdmin ? (
              <EditIcon editHandler={() => editHandler("service", true)} />
            ) : (
              ""
            )}
            </div>
          <div className="col-md-6 p-2">
            <img src={serviceImg1} alt="" className="img-fluid w-100 h-100" />
          </div>
          <div className="col-md-6 p-4">
            <Title title={item.title} />
            <p>{item.description}</p>
            <Link to={item.link} className="btn btn-primary mt-4">
              Know More
            </Link>
          </div>
        </div>
      ))}

      {componentEdit.service ? (
        <div className="container position-fixed adminEditTestmonial p-1">
          <ServiceForm editHandler={editHandler} componentType="service" />
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </>
  );
};

export default HomeServices;
