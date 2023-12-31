import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
// Components
import useAdminLoginStatus from "../../Common/customhook/useAdminLoginStatus";

// Components
import Title from "../../Common/Title";
import EditIcon from "../../Common/AdminEditIcon";
import ModelBg from "../../Common/ModelBg";
import JobPostFrom from "../../Admin/Components/forms/JobpostForm";
import { axiosServiceApi } from "../../util/axiosUtil";
import { confirmAlert } from "react-confirm-alert";
import DeleteDialog from "../../Common/DeleteDialog";
import { axiosClientServiceApi } from "../../util/axiosUtil";
import { getCookie } from "../../util/cookieUtil";

// Styles
import "./JobPost.css";
import { sortCreatedDateByDesc } from "../../util/dataFormatUtil";
import { showPosteddate } from "../../util/commonUtil";

const JobPost = ({ addJobs, posts, setPosts,setPageloadResults }) => {
  const editComponentObj = {
    job: false,
  };

  const [editPost, setEditPosts] = useState({});
  const [show, setShow] = useState(false);
  const isAdmin = useAdminLoginStatus();
  const [componentEdit, SetComponentEdit] = useState(editComponentObj);
  const userCookie = getCookie("access");

  const editHandler = (name, value, item) => {
    setEditPosts(item);
    SetComponentEdit((prevFormData) => ({ ...prevFormData, [name]: value }));
    setShow(!show);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (!componentEdit.job) {
      getCareerData();
    }
  }, [componentEdit.job, addJobs]);

  const getCareerData = async () => {
    let response = null;
    try {
      if (userCookie) {
        response = await axiosServiceApi.get(`/careers/createCareer/`);
        setPageloadResults(true)
      } else {
        response = await axiosClientServiceApi.get(
          `/careers/clientCareersList/`,
        );
        setPageloadResults(false)
      }
      // const data = sortCreatedDateByDesc(response.data.careers);
      setPosts(response.data);
     
    } catch (error) {
      console.log("Unable to get the Career data");
    }
  };

  const deleteJobPost = (id, title) => {
    const deleteImageByID = async () => {
      const response = await axiosServiceApi.delete(
        `/careers/updateCareer/${id}/`,
      );
      if (response.status === 204) {
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
  };

  const publishCareer = async (item) => {
    let response = "";
    try {
      response = await axiosServiceApi.patch(
        `/careers/publishCareers/${item.id}/`,
        { publish: !item.publish },
      );

      if (response.status === 200) {
        let careers = response.data.careers;
        toast.success(
          `Career ${
            careers.publish ? "published" : "un published"
          } successfully`,
        );
        getCareerData();
      }
    } catch (error) {
      console.log("unable to save the career form");
    }
  };

  return (
    <>
      {posts?.length > 0 ? (
        posts.map((item, index) => (
          <div
            className={`col-md-6 col-lg-3 mt-3 mt-md-4 position-relative`}
            // <div
            // className={`col-sm-6 col-md-4 col-lg-3 mt-3 mt-md-5 position-relative ${
            //   item.publish ? "border border-success" : ""
            // }`}
            key={item.id}
          >
            <div className="d-flex gap-5 gap-sm-4 gap-md-3 gap-lg-3 justify-content-end mb-2 p-1">
              {isAdmin ? (
                <>
                  <div
                    onClick={() => editHandler("job", true, item)}
                    className="cursorPointer"
                  >
                    <i
                      className="fa fa-pencil text-warning cursor-pointer fs-5"
                      aria-hidden="true"
                    ></i>
                  </div>

                  {/* <EditIcon
                    editHandler={() => editHandler("job", true, item)}
                  /> */}

                  <div>
                    <Link
                      to=""
                      onClick={(event) =>
                        deleteJobPost(item.id, item.job_title)
                      }
                      className=" p-2"
                    >
                      <i
                        className="fa fa-trash-o fs-5 text-danger"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </div>

                  <div>
                    <Link
                      to={`/career-details/${item.id}/`}
                      className="text-secondary"
                    >
                      <i className="fa fa-expand" aria-hidden="true"></i>
                    </Link>
                  </div>

                  <div className="">
                    <Link to="" onClick={() => publishCareer(item)}>
                      {item.publish ? (
                        <small className="bg-success p-1 text-white px-2 rounded">
                          Published
                        </small>
                      ) : (
                        <small className="bg-secondary p-1 text-white px-2 rounded">
                          Un Pub'd
                        </small>
                      )}
                    </Link>
                    {/* <EditIcon editHandler={() => publishCareer(item)} /> */}
                  </div>
                </>
              ) : (
                <div>
                  <Link
                    to={`/career-details/${item.id}/`}
                    className="text-secondary"
                  >
                    <i className="fa fa-expand" aria-hidden="true"></i>
                  </Link>
                </div>
              )}
            </div>

            {/* Page Banner Component */}
            {/* <div className="position-realative">
                {isAdmin ? (
                  <EditIcon
                    editHandler={() => editHandler("job", true, item)}
                  />
                ) : (
                  ""
                )}
              </div> */}

            {/* publihser Icon */}

            <div className="p-3 jobPost">
              <small className="d-block location mb-3">
                <i
                  className="fa fa-map-marker fs-5 text-muted"
                  aria-hidden="true"
                ></i>{" "}
                {item.job_location}
              </small>
              <Title title={item.job_title} cssClass="fs-5 fw-bold" />

              <div className="mt-0 mb-3">
                <Title title="Company" cssClass="text-muted fw-bolder fs-6" />
                <p className="m-0">{item.company_name} </p>
              </div>
              <div className="">
                <Title
                  title="Job Description"
                  cssClass="text-secondary fw-bolder"
                />
                {/* <p className="m-0">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: getFirstShortDescription(item.description),
                    }}
                  />
                </p> */}
              </div>
              <span className="d-block mb-2">
                <strong className="d-block">Experience</strong>
                {item.experience_from ? item.experience_from : 0} to{" "}
                {item.experience_to ? item.experience_to : 0} Years
              </span>
              <small className="d-block">
                <strong className="d-block">Posted on</strong>
                {showPosteddate(item.posted_date) == 0 ? (
                  "Today"
                ) : (
                  <>
                    [{" "}
                    <strong className="">
                      {showPosteddate(item.posted_date)}
                    </strong>{" "}
                    ] days ago
                  </>
                )}
              </small>

              {/* {isAdmin ? (
                  <div className="text-end">
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
                    <Link
                      onClick={(event) =>
                        deleteJobPost(item.id, item.job_title)
                      }
                      className="bg-danger p-2 rounded"
                    >
                      <i
                        className="fa fa-trash-o fs-5 text-white"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </div>
                ) : (
                  ""
                )} */}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-5">
          {!isAdmin && (
            <p className="text-center fs-4">
              At present there are not news items are available.
            </p>
          )}
          {isAdmin ? (
            <>
              <p className="text-center fs-4">
                There are no news items found. Please create news items.
              </p>
              <Link to="/login" className="btn btn-primary fs-5 w-25">
                Login to Add Careers{" "}
                <i className="fa fa-plus mx-2" aria-hidden="true"></i>{" "}
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
      )}

      {componentEdit.job ? (
        <div className="adminEditTestmonial">
          <JobPostFrom
            editHandler={editHandler}
            componentType="job"
            editPost={editPost}
          />
        </div>
      ) : (
        ""
      )}

      {show && <ModelBg />}
    </>
  );
};

export default JobPost;
