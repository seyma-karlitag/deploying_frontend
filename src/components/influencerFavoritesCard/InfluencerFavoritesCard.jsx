import React from 'react';
import './influencerFavoritesCard.css';

import HeartButton from "./../../components/brand/HeartButton";

import { Link } from "react-router-dom";



const InfluencerFavoritesCard = ({ infCard, key }) => {

  return (
    <div className='infCard' >

      <div className='infCard-picture-frame'>
        <div className='infCard-picture'>
          <img src={infCard.profile_picture_url !== 'N/A' ? infCard.profile_picture_url : 'https://via.placeholder.com/400'} alt={infCard.profile_picture_url} />
        </div>
      </div>

      <div className='infCard-text-info' >
        <div className='infCard-name'>
          <h3>{infCard.username}</h3>
        </div>
        <div className='infCard-username'>
          <h4>{"@" + infCard.username}</h4>
        </div>
        <div className='infCard-categories'>
        {infCard.category.map(c => (
            <h4>{c}</h4>
          ))}
        </div>
      </div>

      <div className='infCard-numeric-info'>
        <div className='infCard-gtt'>
          <div className='infCard-gtt-gonderi'>
            <h4>Gonderi</h4>
            <h3>{infCard.media_count}</h3>
          </div>

          <div className='infCard-gtt-takipci'>
            <h4>Takipçi</h4>
            <h3>{infCard.followers_count}</h3>
          </div>

{/*           <div className='infCard-gtt-takip'>
            <h4>Takip</h4>
            <h3>{infCard.takip}</h3>
          </div> */}
        </div>

        <div className='infCard-point-and-heart-button'>
          <div className='infCard-point'>
            <h2>{infCard.IGI}</h2>
          </div>
          <div className='infCard-heart-button'>
            <Link to={`/favorites`} style={{ textDecoration: 'none' }}>
              <HeartButton status={true} infUsername={infCard.username} />       
            </Link>
          </div>
        </div>
      </div>




    </div>
  )
}

export default InfluencerFavoritesCard