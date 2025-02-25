import React from 'react'
import "./ForumCard.scss"
import { Link } from 'react-router-dom'

export const ForumCard = ({item}) => {
  return (
    <Link to="/" className='link'>
        <div className="ShelterCard">
            
            <div className="info">
                <div className="user">
                    <img src="/img/svishaal.jpg" alt="" />
                    <span>{item.by}</span>
                </div>
                <p>{item.description}</p>
                <div className="star">
                    
                    <span>From {item.by}</span>
                </div>
            </div>
            <hr/>
            <div className="details">
                <button className="btn1">Dicuss Now</button>
                
            </div>
        </div>
    </Link>
  )
}
