import React, { useEffect } from 'react'
import "./Gig2.scss"
import { Link } from 'react-router-dom'
import { Slider } from 'infinite-react-carousel'


export const Gig2 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="gig">
      <div className="container">
        <div className="left">
         
          <h1>Comprehensive Full Stack Development Workshop</h1>
          <div className="user">
            <img
              className="pp"
              src="/img/surya4.png"
              alt=""
            />
            <span>Tech Academy</span>
            
          </div>
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
            <img
              src="https://assets.awwwards.com/awards/images/2021/09/creative-layouts-thumb3.jpg"
              alt=""
            />
            <img
              src="/img/webdev1.jpg"
              alt=""
            />
            <img
              src="/img/webdev3.png"
              alt=""
            />
          </Slider>
          <h2>About This Workshop</h2>
          <p>
            Join our intensive Full Stack Development Workshop and master both frontend and backend technologies. Learn to build complete web applications using modern frameworks like React, Node.js, Express, and MongoDB. Suitable for beginners and intermediate developers looking to enhance their skills.
          </p>
          <div className="seller">
            <h2>About The Instructors</h2>
            <div className="user">
              <img
                src="https://s3-eu-west-1.amazonaws.com/tpd/logos/6047d72682d4930001d2edfa/0x0.png"
                alt=""
              />
              <div className="info">
                <span>Tech Club REC</span>
                
                <button>Contact Us</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">Location</span>
                  <span className="desc">Online & In-person</span>
                </div>
                <div className="item">
                  <span className="title">Established</span>
                  <span className="desc">Jan 2022</span>
                </div>
                <div className="item">
                  <span className="title">Workshop Duration</span>
                  <span className="desc">6 Weeks</span>
                </div>
                <div className="item">
                  <span className="title">Topics Covered</span>
                  <span className="desc">HTML/CSS, JavaScript, React, Node.js, MongoDB</span>
                </div>
                <div className="item">
                  <span className="title">Language</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
              Our Full Stack Development Workshop is led by industry professionals with years of experience in web development and teaching. Our instructors have worked with leading tech companies and startups, bringing real-world expertise to the classroom. We focus on practical, hands-on learning with projects that simulate actual work environments. By the end of this workshop, you'll have built multiple full-stack applications and gained the confidence to tackle complex development challenges. Our curriculum is constantly updated to reflect the latest industry trends and tools.
              </p>
            </div>
          </div>
          
        </div>
        <div className="right">
          <div className="user">
            <img
              className="pp"
              src="https://s3-eu-west-1.amazonaws.com/tpd/logos/6047d72682d4930001d2edfa/0x0.png"
              alt=""
            />
            <span>Tech Club REC</span>
            
          </div>
          <div className="price">
            <h3>Full Stack Development Workshop</h3>
            <br/>
           
          </div>
          <p>
          Comprehensive training in frontend and backend technologies with hands-on projects.
          </p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>6 Weeks Duration</span>
            </div>
          </div>
          <div className="features">
            <div className="item">
              <img src="/img/tick1.png" alt="" />
              <span>Live Coding Sessions</span>
            </div>
            <div className="item">
              <img src="/img/tick1.png" alt=""  width='50px'/>
              <span>Personalized Feedback</span>
            </div>
            <div className="item">
              <img src="/img/tick1.png" alt="" />
              <span>Project Portfolio</span>
            </div>
          </div>
          <p className='scroll'>Scroll down for more info</p>
        </div>
      </div>
    </div>
  );
}