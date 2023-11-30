import React from 'react'
import EditAdminPopupHeader from '../EditAdminPopupHeader'

const AddressTextArea = ({editHandler, componentType}) => {

    const closeHandler = () => {
        editHandler(componentType, false)
        document.body.style.overflow = "";
      }

  return (
    <div className='bg-white'>
        <EditAdminPopupHeader closeHandler={closeHandler} title={componentType}/>
        <form className="g-3 mb-md-0">
        <div className='container'>
          <div className='row py-0 pb-md-5'>
            <div className='col-md-6 mb-5 mb-md-0'>
                <div className="mb-3 row">
                  <label for="" className="col-sm-2 col-form-label text-start text-md-end text-capitalize">{componentType}</label>
                  <div className="col-sm-10">
                  
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                  {componentType === "map" ? <small className='text-dark mt-2 d-inline-block'>Please place the google map script.</small> : ""}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label for="" className="col-sm-2 col-form-label text-start text-md-end">Phone</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control p-2" />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label for="" className="col-sm-2 col-form-label text-start text-md-end">Contact</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control p-2" />
                  </div>
                </div>
            </div>

            <div className='col-md-6 mb-5 mb-md-0'>
              <div className="mb-3 row">
                  <label for="" className="col-sm-2 col-form-label text-start text-md-end">Facebook</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control p-2" />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label for="" className="col-sm-2 col-form-label text-start text-md-end">Twitter</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control p-2" />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label for="" className="col-sm-2 col-form-label text-start text-md-end">Linked In</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control p-2" />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label for="" className="col-sm-2 col-form-label text-start text-md-end">You Tube</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control p-2" />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label for="" className="col-sm-2 col-form-label text-start text-md-end">Instagram</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control p-2" />
                  </div>
                </div>
            </div>
          </div>
          <div className='row py-0 pb-md-5'>
            <div className="text-center">
              <button className='btn btn-secondary mx-3'>Clear</button>  
              <button className='btn btn-primary'>Save</button>
            </div>
          </div>
        </div>
        </form>
    </div>
  )
}

export default AddressTextArea