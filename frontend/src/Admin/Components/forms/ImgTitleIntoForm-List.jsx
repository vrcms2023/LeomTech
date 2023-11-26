import React from 'react'
import {Link} from 'react-router-dom'

import EditAdminPopupHeader from '../EditAdminPopupHeader'

import Cimg1 from '../../../Images/carousel1.jpg'

const AdminBanner = ({editHandler, componentType}) => {

  const closeHandler = () => {
    editHandler(componentType, false)
    document.body.style.overflow = "";
  }

  return (
      <div className='bg-white'>
        <EditAdminPopupHeader closeHandler={closeHandler} title={componentType}/>
        <div className='container'>
          <div className='row py-0 pb-md-5'>

            <div className='col-md-6 mb-5 mb-md-0'>
            <form className="g-3  mb-md-0">
              <div className="mb-3 row">
                <label for="" className="col-sm-2 col-form-label text-start text-md-end">Image</label>
                <div className="col-sm-10">
                  <input className="form-control p-2" type="file" id="" />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="" className="col-sm-2 col-form-label text-start text-md-end">Title</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control p-2" />
                </div>
              </div>

              <div className="mb-3 row">
                <label for="" className="col-sm-2 col-form-label text-start text-md-end">Caption</label>
                <div className="col-sm-10">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
              </div>

              <div className="text-center mt-5">
              <button className='btn btn-secondary mx-3'>Clear</button>  
              <button className='btn btn-primary'>Save</button>
              </div>
            </form>
            </div>
            <div className='col-md-6 mt-3 mt-md-0'>
              <div className='container'>

                <div className='row mb-4 slideItem'>
                  <div className='col-4 col-md-2'>
                    <img src={Cimg1} alt="" className='w-100' />
                  </div>
                  <div className='col-6 col-md-8 '>
                    <h6 className='fw-bold m-0 fs-6'>Carousel Title</h6>
                    <small className='text-muted d-none d-md-block'>Slide Description By default one slide form should be shown.</small>
                  </div>
                  <div className='col-2 col-md-2 d-flex justify-content-between align-items-center flex-column flex-md-row'>
                    <Link to="#"><i className="fa fa-pencil fs-4 text-warning" aria-hidden="true"></i></Link>
                    <Link to="#"><i className="fa fa-trash fs-4 text-danger" aria-hidden="true"></i></Link>
                  </div>
                </div>

                <div className='row mb-4 slideItem'>
                  <div className='col-4 col-md-2'>
                    <img src={Cimg1} alt="" className='w-100' />
                  </div>
                  <div className='col-6 col-md-8 '>
                    <h6 className='fw-bold m-0 fs-6'>Carousel Title</h6>
                    <small className='text-muted d-none d-md-block'>Slide Description By default one slide form should be shown.</small>
                  </div>
                  <div className='col-2 col-md-2 d-flex justify-content-between align-items-center flex-column flex-md-row'>
                    <Link to='#'><i className="fa fa-pencil fs-4 text-warning" aria-hidden="true"></i></Link>
                    <Link to='#'><i className="fa fa-trash fs-4 text-danger" aria-hidden="true"></i></Link>
                  </div>
                </div>

                
               
              </div>
            </div>

          </div>
        </div>
      </div>
    
  )
}

export default AdminBanner