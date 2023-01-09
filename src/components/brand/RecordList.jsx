import * as React from 'react';
import { useState, useEffect } from 'react';
import './card.css';
import { Link } from "react-router-dom";
import Card from './Card';

import Modal from './Pop';

const categories = ["teknoloji", "moda", "spor", "kozmetik", "seyehat", "sanat", "aksesuar", "restorant", "eğlence"];

export default function RecordList({ filters, status }) {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("incard: " + filters);
  console.log("incardlength: " + filters.length);

  
  // This method fetches the records from the database.
  useEffect(() => {
    
    async function getRecords() {
      let response = false;
      
      if (filters.length === 0)  {
        response = await fetch(`https://getinfluenced.onrender.com/api/tours/`);
        //console.log("http://localhost:3001/api/tours/popular");
      }
      else {
        let apiString = "https://getinfluenced.onrender.com/api/tours/categories?categories=";
        for (let i = 0; i < filters.length; i++) {
          //console.log("filters i: " + filters[i]);
          apiString += categories[filters[i]] + ",";
        }
        
        response = await fetch(apiString);
        //console.log(apiString);
      }
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const records = await response.json();
      console.log(records);
      setRecords(records?.data?.tours);
    }
  
    getRecords();
  
    return;
  }, [filters]);
  
  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Link to={`/influencerProfile?influencer=${record.username}`} style={{ textDecoration: 'none' }}>
          <Card profile={record} auth={false} />
        </Link>
          
      );
    });
  }

  return (
    <>
      {recordList()}
    </>
  );
}