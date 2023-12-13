import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment'
import { toast } from "react-toastify"; 
// Components
import  useAdminLoginStatus  from "../../Common/customhook/useAdminLoginStatus";

// Components
import Title from "../../Common/Title";
import EditIcon from "../../Common/AdminEditIcon";
import ModelBg from "../../Common/ModelBg";
import JobPostFrom from "../../Admin/Components/forms/JobpostForm";
import { axiosServiceApi } from "../../util/axiosUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../Common/DeleteDialog";
import { axiosClientServiceApi } from "../../util/axiosUtil";

// Styles
import "./JobPost.css";
import { getFirstShortDescription } from "../../util/dataFormatUtil";
import { showPosteddate } from "../../util/commonUtil";

const JobPost = ({addJobs}) => {

  const editComponentObj = {
    job: false,
  };

  const [posts, setPosts] = useState([]);
  const [editPost, setEditPosts] = useState({});
  const [show, setShow] = useState(false);
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);

  const editHandler = (name, value, item) => {
    setEditPosts(item)
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if(!componentEdit.job){
      getCareerData();
    }
   
  }, [componentEdit.job, addJobs]);

  const getCareerData = async () => {
    let response = null
    try {
      response = await axiosServiceApi.get(`/careers/createCareer/`);
      // if(!isAdmin){
      //   response = await axiosClientServiceApi.get(`/careers/clientCareersList/`);
      // } else {
      //   response = await axiosServiceApi.get(`/careers/createCareer/`);
      // }
      setPosts(response.data.careers)
    } catch (error) {
      console.log("Unable to get the Career data");
    }
  };


  const deleteJobPost = (id, title) => {
    const deleteImageByID = async () => {
      const response = await axiosServiceApi.delete(`/careers/updateCareer/${id}/`);
      if (response.status == 204) {
        toast.success(`${title} Career is delete successfully `);
        getCareerData();
      }
    };

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DeleteDialog
            onClose={onClose}
            callback={deleteImageByID}
            message={`deleting the ${title} image?`}
          />
        );
      },
    });
  }

  const publishCareer = async(item) => {
    let response = "";
    try {
        response = await axiosServiceApi.patch(`/careers/publishCareers/${item.id}/`, {'publish': !item.publish});
    
      if (response.status == 200) {
        toast.success(`Career  published successfully `);
        getCareerData();
       }
    } catch (error) {
      console.log("unable to save the career form");
    }
  }


  return (
    <>
      {posts.length > 0 ? posts.map((item, index) => (
        <div
          className={`col-sm-6 col-md-4 col-lg-3 mt-3 mt-md-5 position-relative ${item.publish ? 'border border-success':''}`}
          key={item.id} 
        >
          {/* Page Banner Component */}
          <div className="position-relative">
            {isAdmin ? (
              <EditIcon editHandler={() => editHandler("job", true, item)} />
            ) : (
              ""
            )}
          </div>
           
           {/* publihser Icon */}

          <div className="col-sm-6 col-md-4 col-lg-3 mt-3 mt-md-5 position-relative">  
          <EditIcon editHandler={() => publishCareer(item)} />
        </div>
          <div className="p-3 jobPost">
            <span className="d-block location mb-3">{item.location}</span>
            <Title title={item.job_title} />
            <div className="my-3">
              <Title title="Job Description" cssClass="fs-6 fw-bold" />
              <p className="m-0" >
                <div dangerouslySetInnerHTML={{ __html: getFirstShortDescription(item.description) }} />
              </p>
            </div>
            <span className="d-block mb-2">
              <strong>Experience</strong> {item.experience_from ? item.experience_from : 0} to {item.experience_to ? item.experience_to : 0} Years
            </span>
            <small className="d-block">Posted {showPosteddate(item.posted_date )} days ago{" "}</small>
            {isAdmin ? (<div className="text-end">
              <Link
                to={`/career-details/${item.id}/`}
                className="stretched-link text-secondary"
              >
                <i className="fa fa-expand" aria-hidden="true"></i>
              </Link>
            </div>
            ) : (
              ""
            )}
            {isAdmin ? (
              <div className="mt-3 text-end deletePost">
                <Link onClick={(event) => deleteJobPost(item.id, item.job_title)}  className="bg-danger p-2 rounded">
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
      )) : ''}

      {componentEdit.job ? (
        <div className="adminEditTestmonial">
          <JobPostFrom editHandler={editHandler} componentType="job" editPost={editPost}/>
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </>
  );
};

export default JobPost;
