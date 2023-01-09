import React from "react";
import RecordList from "./RecordList";
import { useState } from "react";

import Modal from "./Pop";

import CheckBox from "./CheckBox";
import BestOfWeekComponent from "./../bestOfWeekComponent/BestOfWeekComponent";

import "./brand.css";

/* const NumericOnly = (e) => {
  const reg = /^[0-9\b]+$/
  let preval=e.target.value
  if (e.target.value === '' || reg.test(e.target.value)) return true
  else e.target.value = preval.substring(0,(preval.length-1))
} */

const auth = false;

/* function Popup() {

  function togglePopup() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
  }

  return (
    <div className="popup-container" id='blur'>
        <h1>Profil detaylarını görebilmek için lütfen giriş yapınız.</h1 >
        <div className='popup-buttons'>
        <button type="submit" value="Giriş Yap" className="popup-input" onclick="togglePopup()" />
        <button type="submit" onClick={togglePopup} value="Vazgeç" className="popup-input" />

      </div>
    </div>
  );
} */

const BestOfWeekLabel = () => {
  return (
    <>
      <div className="bestofweek-div">
        <h3 className="bestofweek-h3">HAFTANIN ENLERİ</h3>
      </div>
    </>
  );
};

const Brand = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [Filters, setFilters] = useState([]);

  const handleFilters = (filters, category) => {
    console.log("filtersbrand: " + filters);
    const newFilters = [...filters];
    setFilters(newFilters);
    console.log("Filters: " + newFilters);
  };

  return (
    <div className="brand-main">
      {<BestOfWeekLabel />}
      <div className="bestofweek-container">{<BestOfWeekComponent />}</div>

      <div className="brand">

        { (!isLoading) &&
        <div className="filters">
          <h3 className="category-header">KATEGORİLER</h3>
          <CheckBox
            handleFilters={(filters) => handleFilters(filters, "categories")}
          />
        </div>
        }
  

        <div className="label-and-container">
          <div className="container">
            {/*         <Card profile={profile1} auth={auth} />*/}
            <RecordList filters={Filters} status={setIsLoading}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
