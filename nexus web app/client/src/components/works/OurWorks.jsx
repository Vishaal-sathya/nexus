import React from 'react';
import './styles.css'; // Make sure to import your CSS file

const OurWorks = () => {
  return (
    <div className='rotating-div'>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body::before {
            position: absolute;
            width: min(1400px, 90vw);
            top: 10%;
            left: 50%;
            
            height: 90%;
            transform: translateX(-50%);
            content: '';
            background-image: url(images/bg.png);
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: top center;
            pointer-events: none;
          }
        `}
      </style>
      <div className="banner" >
        <div className="slider" style={{ '--quantity': 5 }}>
          <div className="item" style={{ '--position': 1 }}> <img src="/img/top/1.png" alt="" /> </div>
          <div className="item" style={{ '--position': 2 }}>

    <img src="/img/top/2.png" alt="" />

</div>
<div className="item" style={{ '--position': 3 }}>
 
    <img src="/img/top/3.png" alt="" />
 
</div>
<div className="item" style={{ '--position': 4 }}>
 
    <img src="/img/top/4.png" alt="" />

</div>
{/* <div className="item" style={{ '--position': 5 }}>
  <a href="#">
    <img src="/assets/ndrf1.png" alt="" />
  </a>
</div> */}
<div className="item" style={{ '--position': 5 }}>
  
    <img src="/img/top/5.png" alt="" />
 
</div>
          {/* <div className="item" style={{ '--position': 7 }}><img src="images/dragon_7.jpg" alt="" /></div>
          <div className="item" style={{ '--position': 8 }}><img src="images/dragon_8.jpg" alt="" /></div>
          <div className="item" style={{ '--position': 9 }}><img src="images/dragon_9.jpg" alt="" /></div>
          <div className="item" style={{ '--position': 10 }}><img src="images/dragon_10.jpg" alt="" /></div> */}
        </div>
        <div className="content">
          <h1 data-content="LEADERBOARD">LEADERBOARD</h1>
          <div className="author">
            <h2>Top Performers</h2>
            <p className='by'><b>on nexus.</b></p>
            <p></p>
          </div>
          <div className="model"></div>
        </div>
      </div>
    </div>
  );
};

export default OurWorks;