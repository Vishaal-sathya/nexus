import React, { useEffect } from 'react'
import "./Skill.scss"
import { Link } from 'react-router-dom'
import { Slider } from 'infinite-react-carousel'


export const Skill = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (


    <div className="gig">
      <div className="container">
        <div className="left">
         
          <h1>Full Stack Development Workshop: Skill Trading Offer</h1>
          <div className="user">
            <img
              className="pp"
              src="/img/vishaal5.png"
              alt=""
            />
            <span>Vishaal</span>
            
          </div>
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
            <img
              src="https://miro.medium.com/v2/resize:fit:750/1*3T7J7csXY8u36acofw5N8g.jpeg"
              alt=""
            />
            <img
              src="https://cdn6.f-cdn.com/files/download/82615852/web-dev-ty.jpg?image-optimizer=force&format=webply&width=967"
              alt=""
            />
            <img
              src="https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F46svi8w34vnovakeicdh.png"
              alt=""
            />
          </Slider>
          <h2>About This Skill Exchange</h2>
          <p>
            I'm offering a comprehensive Full Stack Development Workshop where I'll teach you to build complete web applications using React, Node.js, Express, and MongoDB. In exchange, I'm looking to learn digital marketing, UI/UX design, or data visualization skills. This skill trading arrangement is perfect for those who want to expand their technical knowledge while sharing their own expertise.
          </p>
          <div className="seller">
            <h2>About The Skill Provider</h2>
            <div className="user">
              <img
                src="/img/vishaal5.png"
                alt=""
              />
              <div className="info">
                <span>Vishaal</span>
                
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">Location</span>
                  <span className="desc">Remote / Online</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Mar 2023</span>
                </div>
                <div className="item">
                  <span className="title">Exchange Duration</span>
                  <span className="desc">8 Weekly Sessions</span>
                </div>
                <div className="item">
                  <span className="title">Skills I Offer</span>
                  <span className="desc">Full Stack Dev, React, Node.js, MongoDB</span>
                </div>
                <div className="item">
                  <span className="title">Skills I Seek</span>
                  <span className="desc">Digital Marketing, UI/UX Design, Data Viz</span>
                </div>
              </div>
              <hr />
              <p>
              I'm a full-stack developer with 5+ years of experience building web applications for startups and established companies. I've worked with various technologies but specialize in the MERN stack (MongoDB, Express, React, Node.js). I enjoy teaching others and breaking down complex concepts into manageable pieces. Through this skill exchange, I'll guide you through building a complete web application from scratch, covering both frontend and backend development. I believe in learning by doing, so we'll work on practical projects that reinforce the concepts we discuss. In return, I'm eager to learn new skills that complement my technical knowledge and help me become a more well-rounded professional.
              </p>
            </div>
          </div>
          
        </div>
        <div className="right">
          <div className="user">
            <img
              className="pp"
              src="/img/vishaal5.png"
              alt=""
            />
            <span>Vishaal</span>
            
          </div>
          <div className="price">
            <h3>Skill Trading Proposal</h3>
            <br/>
            <h2>No Money Exchanged</h2>
          </div>
          <p>
          I teach you full-stack development, you teach me your expertise.
          </p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>8 Weekly Sessions (2 hours each)</span>
            </div>
          </div>
          <div className="features">
            <div className="item">
              <img src="/img/tick1.png" alt="" />
              <span>1-on-1 Interactive Sessions</span>
            </div>
            <div className="item">
              <img src="/img/tick1.png" alt=""  width='50px'/>
              <span>Project-Based Learning</span>
            </div>
            <div className="item">
              <img src="/img/tick1.png" alt="" />
              <span>Code Reviews & Mentorship</span>
            </div>
          </div>
          <p className='scroll'>Scroll down to see what I'm looking to learn</p>
          <div className="features" style={{marginTop: "20px"}}>
            <h4>Skills I'm Looking To Learn:</h4>
            <div className="item">
              <img src="/img/tick1.png" alt="" />
              <span>Digital Marketing (SEO, Social Media)</span>
            </div>
            <div className="item">
              <img src="/img/tick1.png" alt=""  width='50px'/>
              <span>UI/UX Design Fundamentals</span>
            </div>
            <div className="item">
              <img src="/img/tick1.png" alt="" />
              <span>Data Visualization Techniques</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}