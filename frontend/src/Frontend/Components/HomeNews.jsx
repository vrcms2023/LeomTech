import React, { useState } from "react";
import { Link } from "react-router-dom";

import Title from "../../Common/Title";

// Styles
import "./HomeNews.css";

import newsImg3 from "../../Images/news3.png";
import EditIcon from "../../Common/AdminEditIcon";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import AdminBanner from "../../Admin/Components/forms/ImgTitleIntoForm-List";
import NewsForm from "../../Admin/Components/News/index";
import ModelBg from "../../Common/ModelBg";

const HomeNews = () => {
 
  const [news, setNews] = useState([
    {
      img: "../../Images/news1.png",
      title: "Claude & Stable AI Is Stealing ChatGPT’s Lunch",
      description:
        "We believe that construction is a man made wonder. The thought of bringing imagination to real life structures excites us, each day the passion in us grows as we contribute to this industry.",
      link: "#",
    },
    {
      img: "../../Images/news2.png",
      title: "Impact Of Copilot On Code Generation",
      description:
        "We believe that construction is a man made wonder. The thought of bringing imagination to real life structures excites us, each day the passion in us grows as we contribute to this industry.",
      link: "#",
    },
    {
      img: "newsImg3",
      title: "Top Six Most Common Password Attacks And How To Avoid Them",
      description:
        "We believe that construction is a man made wonder. The thought of bringing imagination to real life structures excites us, each day the passion in us grows as we contribute to this industry.",
      link: "#",
    },
    {
      img: "newsImg4",
      title: "Maximizing Customer Engagement With Salesforce",
      description:
        "We believe that construction is a man made wonder. The thought of bringing imagination to real life structures excites us, each day the passion in us grows as we contribute to this industry.",
      link: "#",
    },
  ]);

  const editComponentObj = {
    news: false,
  };

  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const [show, setShow] = useState(false);

  const editHandler = (name, value) => {
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      {news.map((item, index) => (
        <div
          className="col-sm-6 col-md-3 mb-4 mb-md-0"
          key={`${index}+homenews`}
        >
          <div className="card position-relative homeNews">
            {/* Edit News */}
            {isAdmin ? (
              <EditIcon editHandler={() => editHandler("news", true)} />
            ) : (
              ""
            )}
            <img src={newsImg3} className="img-fluid" alt="Ongoing Projects" />
            <div className="card-body p-4">
              <Title title={item.title} cssClass="fs-5 fw-bold lh-sm mb-2" />
              <p className="card-text mb-4">{item.description}</p>
              <Link to={item.link}>Read more</Link>
            </div>

            {isAdmin ? (
              <div className="text-end deleteNews">
                <Link to="" className="bg-danger p-2 rounded">
                  <i
                    className="fa fa-trash-o fs-5 text-white"
                    aria-hidden="true"
                  ></i>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}

      {componentEdit.news ? (
        <div className="adminEditTestmonial">
          <NewsForm editHandler={editHandler} componentType="news" />
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </>
  );
};

export default HomeNews;
