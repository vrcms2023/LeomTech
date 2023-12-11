import React, {useState} from "react";
import { Link } from "react-router-dom";

// Component Import
import Title from "../../Common/Title";
import NewsForm from '../../Admin/Components/News/index';

// Styles
import "./ABrief.css";

// Image Import
import CareerImg from "../../Images/insrued.png";
import EditIcon from "../../Common/AdminEditIcon";
import { useAdminLoginStatus } from "../../Common/customhook/useAdminLoginStatus";
import ModelBg from "../../Common/ModelBg";

const ABrief = ({ title, cssClass, linkClass, moreLink }) => {

  const editComponentObj = {
    careers: false,
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
    <div className="row h-100">
      {/* Edit News */}
      
      <div className="col-md-5 ABriefImg ">
      
        <img src={CareerImg} alt="" className="w-100 h-100 img-fluid" />
      </div>
      <div className="col-md-7 p-5 d-flex justify-content-center align-items-start flex-column position-relative">
      {isAdmin ? (
              <EditIcon editHandler={() => editHandler("careers", true)} />
            ) : (
              ""
            )}
        <Title title={title} cssClass={cssClass} />
        <div >
          
          <p className="lh-md">
            If you are seeking a career with an organization which promotes
            innovation and excellence, Rishi Systems is the place to be. Join
            our family and become part of a winning team that serves to provide
            services beyond the demand to our customers.
          </p>
        </div>
        <div>
          <Link to={moreLink} className={linkClass}>
            Join Us Now
          </Link>
        </div>
      </div>
      {componentEdit.careers ? (
        <div className="adminEditTestmonial">
          <NewsForm editHandler={editHandler} componentType="careers" />
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </div>
  );
};
export default ABrief;
