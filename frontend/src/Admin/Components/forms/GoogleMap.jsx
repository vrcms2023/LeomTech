import React from 'react'
import EditAdminPopupHeader from '../EditAdminPopupHeader';

const GoogleMap = ({editHandler, componentType}) => {

    const closeHandler = () => {
        editHandler(componentType, false)
        document.body.style.overflow = "";
      }
      
  return (
    <div className='bg-white'>
        <EditAdminPopupHeader closeHandler={closeHandler} title={componentType}/>
            <form className="g-3  mb-md-0">
            <div className='container'>
          <div className='row py-0 pb-md-5'>
              <div className="mb-3 row">
                <label for="" className="col-sm-2 col-form-label text-start text-md-end text-capitalize">{componentType}</label>
                <div className="col-sm-10">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                <small className='mt-3 mb-2 fw-bold d-inline-block'>Example : Copy the google "Embed a map" script like below</small>
                <code className='d-block'>
                &lt;iframe
              className="googlemap"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15226.413145928846!2d78.441906!3d17.430816!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x80e4d67809745a48!2sHPR+INFRA+PROJECTS!5e0!3m2!1sen!2sin!4v1442574301202"
              height="450"
              width="100%"
            &gt; &;t;/iframe&gt;
                </code>
                </div>
                
              </div>

              <div className="text-center mt-5">
              <button className='btn btn-secondary mx-3'>Clear</button>  
              <button className='btn btn-primary'>Save</button>
              </div>
              </div>
              </div>
            </form>
            </div>
  )
}

export default GoogleMap