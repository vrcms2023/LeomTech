import React, { useState } from 'react'
import {Link} from 'react-router-dom'

import Title from '../../Common/Title'

// Styles
import './HomeNews.css'

import newsImg3 from "../../Images/news3.png";

const HomeNews = () => {

    const [news, setNews] = useState(
        [
            {img: "../../Images/news1.png", title: "Claude & Stable AI Is Stealing ChatGPT’s Lunch", description:"We believe that construction is a man made wonder. The thought of bringing imagination to real life structures excites us, each day the passion in us grows as we contribute to this industry.", link: "#"},
            {img: "../../Images/news2.png", title: "Impact Of Copilot On Code Generation", description:"We believe that construction is a man made wonder. The thought of bringing imagination to real life structures excites us, each day the passion in us grows as we contribute to this industry.", link: "#"},
            {img: "newsImg3", title: "Top Six Most Common Password Attacks And How To Avoid Them", description:"We believe that construction is a man made wonder. The thought of bringing imagination to real life structures excites us, each day the passion in us grows as we contribute to this industry.", link: "#"},
            {img: "newsImg4", title: "Maximizing Customer Engagement With Salesforce", description:"We believe that construction is a man made wonder. The thought of bringing imagination to real life structures excites us, each day the passion in us grows as we contribute to this industry.", link: "#"}
        ]
    )

  return (
    <>
    {news.map(item => (
        <div className="col-sm-6 col-md-3 mb-4 mb-md-0">
                <div className="card">
                  <img
                    src={newsImg3}
                    className="img-fluid"
                    alt="Ongoing Projects"
                  />
                  <div className="card-body p-4">
                    <Title title={item.title} cssClass="" />
                    <p className="card-text mb-4">{item.description}</p>
                    <Link to={item.link}>Read more</Link>
                  </div>
                </div>
              </div>
    ))}
    </>
  )
}

export default HomeNews