import React from 'react';
import './influencerProfileCard.css';

/* import likeIcon from '../../assets/like.png'; 
import commentIcon from '../../assets/comment.png'; */

import HeartButton from "./../../components/brand/HeartButton";

import { useState, useEffect } from 'react';
import { InstagramEmbed } from 'react-social-media-embed';
import axios from 'axios';

{/* https://www.npmjs.com/package/react-instagram-embed?activeTab=readme */ }



const InfluencerProfileCard = () => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const x = urlParams.get('influencer');

    useEffect(() => {
        async function fetchUsers() {
            // setLoading(true);
            const response = await axios.get(`https://getinfluenced.onrender.com/api/tours/${x}`);
            setUser(response?.data?.data?.tour);
        }
        fetchUsers();
    }, []);


    if (loading) {
        return <h1>User is loading...</h1>;
    }


    return (
        <>
            {
                user &&
                <div className="infProfCard-container">
                    <div className='infProfCard-info'>

                        <div className='infProfCard'>
                        
                                <div className='infProfCard-heart-button'>
                                    <HeartButton status={false} infUsername={user.username}  />
                                </div>

                                <div className='infProfCard-picture-frame'>

                                    <div className='infProfCard-picture'>
                                        <img
                                            src={user.profile_picture_url !== 'N/A'
                                                ? user.profile_picture_url
                                                : 'https://via.placeholder.com/400'}
                                            alt={user.profile_picture_url} />
                                    </div>
                                </div>

                                <div className='infProfCard-text-info'>
                                    <div className='infProfCard-name'>
                                        <h3>{user.name}</h3>
                                    </div>
                                    <div className='infProfCard-username'>
                                        <h4>{"@" + user.username}</h4>
                                    </div>
                                    <div className='infProfCard-categories'>
                                        {
                                            user?.category?.map(c => (
                                                <h4>{c}</h4>
                                            ))
                                        }
                                    </div>
                                </div>

                            <div className='infProfCard-numeric-info'>
                                <div className='infProfCard-gtt'>
                                    <div className='infProfCard-gtt-gonderi'>
                                        <h4>Gonderi</h4>
                                        <h3>{user.media_count}</h3>
                                    </div>

                                    <div className='infProfCard-gtt-takipci'>
                                        <h4>Takipçi</h4>
                                        <h3>{user.followers_count}</h3>
                                    </div>

                                    <div className='infProfCard-gtt-takip'>
                                        <h4>Takip</h4>
                                        <h3>{user.follows_count}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='infProfCard-point'>
                            <h1>{user.IGI}</h1>
                            <h4>/10</h4>
                        </div>

                    </div>

                    {/* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_image_overlay_opacity */}

                    <div className='topMedia-container' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        {
                            user?.top_media?.map((media, index) => (
                                <InstagramEmbed url={media.media_url} width={328} captioned />
                            ))
                        }
                    </div>

                </div>
            }
        </>

    )
}

export default InfluencerProfileCard

/* const TopMedia = ({ image, like, comment }) => {
    return (
        <div className='pa-post-item'>
        <div className="pa-post-item-inner">
            
                
                <div className='icons-like-and-comment'>
                    
                    <div className='likes'>
                        <img className='heartIcon'
                            alt=' '
                            data-src={likeIcon}
                            src={likeIcon}/>
                
                        <h4 className='likes-num'>{ like }</h4>
                    </div>
                
                    <div className='comments'>
                        <img className='commentIcon'
                            alt=' '
                            data-src={commentIcon}
                            src={commentIcon} />
                    
                        <h4 className='comments-num'>{ comment }</h4>
                    </div>

                </div>            
        
            <div className='media-from-instagram'>
                <img className="b-lazy"
                    alt=' '            
                    data-src={image}
                    loading="lazy"
                    data-ll-status="loaded"
                    src={image}>
                </img>
            </div>

        </div>
    </div>
    );
} */