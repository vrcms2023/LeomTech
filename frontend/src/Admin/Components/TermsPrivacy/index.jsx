import React from 'react'
import EditAdminPopupHeader from '../EditAdminPopupHeader';
import Button from '../../../Common/Button';

const AdminTermsAndPrivacy = ({editHandler, componentType, pageType, type}) => {
    const closeHandler = () => {
        editHandler(componentType, false);
        document.body.style.overflow = "";
      };

return (
    <>
      <EditAdminPopupHeader closeHandler={closeHandler} title={componentType} type={type} />
      <div className="container">
        <div className="row p-4">
          <div className="col-md-8 offset-md-2">
            
            <div className="mb-3 row">
              <label
                htmlFor=""
                className="col-sm-3 col-form-label text-start text-md-end"
              >
                Terms And Conditions
              </label>
              <div className="col-sm-9">
                <textarea
                  name=""
                  className="form-control"
                  id=""
                  rows="8"
                  value={""}
                  onChange={""}
                ></textarea>
              </div>
            </div>

            <div className="mb-3 row">
              <label
                htmlFor=""
                className="col-sm-3 col-form-label text-start text-md-end"
              >
                Privacy Polacy
              </label>
              <div className="col-sm-9">
                <textarea
                  name=""
                  className="form-control"
                  id=""
                  rows="8"
                  value={""}
                  onChange={""}
                ></textarea>
              </div>
            </div>

            <div className="text-center mt-4">
              { <Button
                type="submit"
                cssClass="btn btn-secondary mx-3"
                label={"clear"}
                handlerChange={""}
              /> }
              <Button
                type="submit"
                cssClass="btn btn-primary"
                label={"Save"}
                handlerChange={""}
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default AdminTermsAndPrivacy