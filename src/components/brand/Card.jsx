import "./card.css";
import Modal from "./Pop";
import React from "react";

import { useState, useEffect } from "react";

const Card = ({ profile, auth }) => {
  // Use a state variable to track whether the modal should be displayed or not
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    // If the user is not authorized, show the modal
    //console.log("showModal: " + showModal);
    if (!auth) {
      setShowModal(true);
    }
    localStorage.setItem("item", profile.username);
  };

  const handleMouseDown = (event) => {
    if (event.button === 2) {
      localStorage.setItem("item", profile.username);
    }
  };



  return (
    <div
      className="influencer-profile-card"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      {/* Show the modal if showModal is true */}
      {showModal && <Modal auth={auth} onClose={() => setShowModal(false)} />}

      <div className="card-upper-side">
        <div className="profile_picture">
          {" "}
          {/*profile.profile_picture_url*/}
          <img
            src={
              profile.profile_picture_url !== "N/A"
                ? profile.profile_picture_url
                : "https://via.placeholder.com/400"
            }
            referrerPolicy="no-referrer"
            alt={profile.name}
          />
        </div>
        <div className="info-name">
          <h3>{profile.name}</h3>
        </div>
      </div>

      <div className="card-lower-side">
        <div className="info-username">
          {profile?.category?.map((c) => (
            <h4>{c}</h4>
          ))}

        </div>
      </div>

      <div className="influencerPoint">
        <h1>{profile.IGI}</h1>
      </div>
    </div>
  );
};

export default Card;
