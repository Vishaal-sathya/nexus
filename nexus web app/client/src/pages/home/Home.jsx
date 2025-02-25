import React, { useRef } from "react";
import { useEffect, useState } from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";

import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards,cards2, cards3, gigs, logistics, projects, projects2, projects3, shelters } from "../../data";
import { Link, useLocation } from "react-router-dom";

import { ServiceCard2 } from "../../components/serviceCard2/ServiceCard2";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../../components/serviceCard/ServiceCard";
import Marquee from "react-fast-marquee";
import { ShelterCard } from "../../components/shelterCard/ShelterCard";
import { LogisticCard } from "../../components/logisticCard/LogisticCard";
import NewsSlider from "../../components/newsSlider/NewsSlider";
import ReportForm from "../../components/reportForm/ReportForm";
import OurWorks from "../../components/works/OurWorks";


function Home() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef(0);
  const maxRef = useRef(10000);

  const { search } = useLocation();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const imageUrls = [
    "./img/ad3.png",
    "./img/ad4.png",
    "./img/ad3.png",
    "./img/ad5.png",
    
    
  ];

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="home">

      {currentUser?.isSeller ? <Featured /> : <Featured />} 
      {/* <div className="slide-title1">
        <h2>Revolutionizing Disaster Relief</h2>
      </div> */}
      <div className="marquee-section" >
      <Marquee className="marquee" autoFill speed={20}>
        <div className="gallery">
          {imageUrls.map((image, index) => (
            <div key={index} className="gallery-item">
              <img
                src={image}
                alt=""
                width={300}
                height={320}
                className="gallery-image"
              />
            </div>
          ))}
        </div>
      </Marquee>
      
      </div>
      {currentUser?.isLogistics && <div className="slide-title1">
      <h2>Available deliveries</h2>
      
      </div>}
      {/* <NewsSlider /> */}

      {currentUser?.isLogistics &&<div className="donation-cards">
      <Slide slidesToShow={4} arrowsScroll={1}>
      {logistics.map((logistic)=>(
            <LogisticCard key={logistic.id} item={logistic}/>
          ))}
      </Slide>
      <Link className="link" to="/deliveries">
       <button className="btn2">View All</button></Link>
      </div>
       }  
     

      {!currentUser?.isLogistics && <div className="slide-title1">
      {currentUser?.isSeller ? <h2>Upcoming Workshops </h2> : <h2>Upcoming Workshops </h2> }
      
      </div>}
      

      {!currentUser?.isLogistics && <div className="donation-cards">
      <Slide slidesToShow={4} arrowsScroll={1}>
      {gigs.map((gig)=>(
            <ServiceCard2 key={gig.id} item={gig}/>
          ))}
      </Slide>
      <Link className="link" to="/gigs?cat=">
      <button className="btn2">View All</button></Link>
      </div>}
      

      {!currentUser?.isLogistics &&<div className="slide-title1">
      <h2>Top Discussions</h2>
      
      </div>}

      {!currentUser?.isLogistics &&<div className="donation-cards">
      <Slide slidesToShow={4} arrowsScroll={1}>
      {shelters.map((gig)=>(
            <ShelterCard key={gig.id} item={gig}/>
          ))}
      </Slide>
      <Link className="link" to="/forum">
      <button className="btn2">View All</button></Link>
      </div> }

      

     

      {/* <div className="slide-title">
        <h2>Categories</h2>
      </div>
      <Slide slidesToShow={5} arrowsScroll={1}>
        {cards2.map((card) => (
          <CatCard2 key={card.id} card={card} />
        ))}
      </Slide> */}

      

      {/* <div className="slide-title2">
      {currentUser?.isSeller ? <h2>Featured LifeLines </h2> : <h2>Featured Freelancers 🔒 </h2> }
      
      </div>
      {currentUser?.isSeller ? <Slide slidesToShow={5} arrowsScroll={1}>
        {cards3.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide> :
      <Slide slidesToShow={5} arrowsScroll={1}>
      {cards.map((card) => (
        <CatCard key={card.id} card={card} onClick={() => {}} />
      ))}
    </Slide>
     } */}

      

       <div className="slide-title2">
       {currentUser?.isSeller ? <h2>Mentorship Services 🔒</h2> : <h2>Skill Trading Marketplace</h2> }
      </div> 
      {currentUser?.isSeller ? <Slide slidesToShow={4} arrowsScroll={1}>
        {projects2.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide> : <Slide slidesToShow={4} arrowsScroll={1}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide> }

<OurWorks/>      

      
{!currentUser?.isSeller && !currentUser?.isLogistics && (
  <div className="features">
  <div className="container">
    <div className="item">
      <h1>Join Us in Revolutionizing Learning with NEXUS</h1>
      <div className="title">
        Collaborative Learning
      </div>
      <p>
        NEXUS fosters collaboration among students by providing community forums, study groups, and one-on-one mentoring, helping you learn and grow together.
      </p>
      <div className="title">
        Skill Development
      </div>
      <p>
        Our platform empowers students to upskill by offering personalized learning paths, skill gap analysis, and access to workshops and events tailored to your goals.
      </p>
      <div className="title">
        Gamified Motivation
      </div>
      <p>
        NEXUS keeps you motivated with a gamified system that rewards participation, achievements, and mentorship, making learning fun and engaging.
      </p>
      <button className="btn1">Join the NEXUS Community</button>
    </div>
    <div className="item">
      <video src="/img/bgvidd2.mp4" autoPlay muted loop playsInline />
    </div>
  </div>
</div>
  
)}


     

      {(currentUser?.isSeller || currentUser?.isLogistics) && (
  <div className="features dark">
    <div className="container">
      <div className="item">
        <h1>Enhance Disaster Response with <strong>Revive.</strong></h1>
        <img src="./img/revivead.png" alt="" />
      </div>
      <div className="item">
        <h1>
          Revive: Empowering Communities, Connecting Responders, Saving Lives
        </h1>
        <p>
          Ready to revolutionize disaster relief efforts? Discover LifeLine, where we enhance communication and resource coordination during critical times.
        </p>
        <div className="title">
          <img src="./img/check.png" alt="" />
          Deploy resilient LoRa mesh networks for reliable communication
        </div>
        <div className="title">
          <img src="./img/check.png" alt="" />
          Use our mobile app to send and receive emergency assistance requests
        </div>
        <div className="title">
          <img src="./img/check.png" alt="" />
          Coordinate effectively with real-time data and AI-powered optimization
        </div>
        <div className="title">
          <img src="./img/check.png" alt="" />
          Manage resources and donations seamlessly through our platform
        </div>
        <Link className="link" to="/product"><button 
        
        onclick="window.location.href='/product'">
        Buy Now
      </button></Link>
      </div>
     
    </div>
  </div>
)}

    
  
      
      
    </div>
  );
}

export default Home;
