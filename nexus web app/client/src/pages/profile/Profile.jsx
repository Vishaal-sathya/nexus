import React from 'react'
import "./Profile.scss"
import { Link } from 'react-router-dom';


export const Profile = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="gig">
      <div className="container">
        <div className="left">
          
          <div className="seller">
            <h2>About</h2>
            <div className="user">
              <img
                src="/img/svishaal.jpg"
                alt=""
              />
              <div className="info">
                <span>Vishaal S</span>
                {/* <div className="stars">
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <span>5</span>
                </div> */}
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                {/* <div className="item">
                  <span className="title">From</span>
                  <span className="desc">India</span>
                </div> */}
                <div className="item">
                  <span className="title">Department</span>
                  <span className="desc">BTech AIML</span>
                </div>
                <div className="item">
                  <span className="title">Year</span>
                  <span className="desc">3rd Year</span>
                </div>
                <div className="item">
                  <span className="title">Skills</span>
                  <span className="desc">Digital Marketing, Branding</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English, Tamil</span>
                </div>
              </div>
              <hr />
              <p>
              I'm Vishaal, a student based in India passionate about weaving words out of data. I look at data visualization as a key to unlocking the potential of growth and I use machine learning as a tool to strive towards that growth. I pride myself on my curiosity and my unwavering drive to push my self beyond my limits.

I've been part of a 1.5 lakhs success story, a standout finalist in India's largest hackathon, and a delegate at India's biggest startup event.
              </p>
            </div>
            {currentUser?.isSeller && <h2>Services</h2>}
          
        {currentUser?.isSeller && <div className="right">
        <div className="user">
            <img
              className="pp"
              src="/img/svishaal.jpg"
              alt=""
            />
            <span>Vishaal S</span>
            <div className="stars">
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <span>5</span>
            </div>
          </div>
          <div className="price">
          
            <h3>Digital Marketing Expert</h3>
            <br/>
            <h2>Rs. 2999</h2>
          </div>
          <p>
            Digital marketer
          </p>
          <div className="details">
            
          </div>
          <div className="features">
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Branding Design</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Development</span>
            </div>
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>Promotion and Content</span>
            </div>
            
          </div>
         
          <div className="btns">
            
            <button className="btn1">Wave Now</button>
            
            
           
            </div>
           
            
            </div> }
          </div>
          
        
          {/* <div className="reviews">
            <h2>Reviews</h2>
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="/img/seller4.jpg"
                  alt=""
                />
                <div className="info">
                  <span>Joseph</span>
                  <div className="country"> */}
                    {/* <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                      alt=""
                    /> */}
                    {/* <span>India</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>
                A beautiful UI design and excelent UX. He delivered a perfect website
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>
            <hr />
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/4124367/pexels-photo-4124367.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <div className="info">
                  <span>Monisha</span>
                  <div className="country"> */}
                    {/* <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png"
                      alt=""
                    /> */}
                    {/* <span>India</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>
                The quality and speed of delivery is unmatched. Had a wonderful experience working with him. 
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>
            <hr />
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="/img/svishaal.jpg/"
                  alt=""
                />
                <div className="info">
                  <span>Shakithiyan </span>
                  <div className="country">
                    
                    <span>India</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>
                Best value for money. Amazing execution.
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>
          </div> */}
            </div> 
      
    </div> 
    
    </div>
    
    
    
  );
}
