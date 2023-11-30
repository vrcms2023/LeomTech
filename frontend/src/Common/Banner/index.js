import React from 'react'

// Component
import Title from '../Title'

// Styles
import './banner.css'

const Banner = ({bannerImg, alt, title, caption}) => {
  return (
    <div className='pageBanner'>
      <div className={title && caption ? 'titleCaption d-flex jutify-content-center align-items-center flex-column-reverse' : ""}>
        <p>{caption}</p>
        <Title title={title} />
      </div>
      
      <img src={bannerImg} alt={alt} className='w-100'/>
    </div>
  )
}
export default Banner