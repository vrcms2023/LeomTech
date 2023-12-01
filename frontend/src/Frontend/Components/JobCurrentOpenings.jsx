import React, { useState } from 'react'
import { Link } from 'react-router-dom';

// Components
import Title from '../../Common/Title'

// Styles
import './JobPost.css'

const JobCurrentOpenings = () => {

    const jobPosts = [
        {location: "Stafford, VA", title: "QUALITY CONTROL SPECIALIST III", subTitle: "Job Description", exp: "2 - 10 Years", postedDate: "1"},
        {location: "Stafford, VA", title: "Logisticks Analyst", subTitle: "Job Description", exp: "12 Years", postedDate: "7"},
        {location: "Stafford, VA", title: "Data Engineer", subTitle: "Job Description", exp: "20 Years", postedDate: "2"},
        {location: "Stafford, VA", title: "Developer", subTitle: "Job Description", exp: "5 Years", postedDate: "9"},
        {location: "Stafford, VA", title: "React Developer", subTitle: "Job Description", exp: "2 Years", postedDate: "10"},
        {location: "Stafford, VA", title: "Fullstack Developer", subTitle: "Job Description", exp: "2 - 5 Years", postedDate: "22"},
        {location: "Stafford, VA", title: "Frontend Developer", subTitle: "Job Description", exp: "2 - 10 Years", postedDate: "13"},
        {location: "Stafford, VA", title: "Linex Administrator", subTitle: "Job Description", exp: "6 Years", postedDate: "20"},
    ]

    const [posts, setPosts] = useState(jobPosts)

  return (
    <div className='py-4 px-3 currentOpenings'>
        <Title title="CURRENT OPENINGS" cssClass="mb-3" />
        <ul>
            {posts.map(item => (
                <li className='p-2'>
                    <Link to="/career-details">{item.title}</Link>
                </li>
            ))}
            
        </ul>
    </div>
  )
}

export default JobCurrentOpenings