import React from 'react'
import "./ShelterCard.scss"
import { Link } from 'react-router-dom'

export const ShelterCard = ({item}) => {
  return (
    <Link to="/" className='link'>
        <div className="ShelterCard">
            
            <div className="info">
                <div className="user">
                    <img src={item.img} alt="" />
                    <span>{item.by}</span>
                </div>
                <p>{item.description}</p>
                <div className="star">
                    
                    <span>From {item.by}</span>
                </div>
            </div>
            <hr/>
            <div className="details">
                <Link to="/forum">
                <button className="btn1">Dicuss Now</button>
                </Link>
            </div>
        </div>
    </Link>
  )
}
