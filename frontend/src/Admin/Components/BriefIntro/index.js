import React from 'react'
import EditAdminPopupHeader from '../EditAdminPopupHeader'

const index = ({editHandler, componentType}) => {

  const closeHandler = () => {
    editHandler(componentType, false)
    document.body.style.overflow = "";
  }

  return (
    <div className='bg-white'>
      <EditAdminPopupHeader closeHandler={closeHandler} title={componentType}/>
       
    <form className="g-3 w-50 m-auto pb-md-5">
        
        <div className="mb-3 row">
        <label for="" className="col-sm-2 col-form-label text-start text-md-end">Title</label>
        <div className="col-sm-10">
            <input type="text" className="form-control p-2" />
        </div>
        </div>

        <div className="mb-3 row">
        <label for="" className="col-sm-2 col-form-label text-start text-md-end">Description</label>
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
  )
}

export default index