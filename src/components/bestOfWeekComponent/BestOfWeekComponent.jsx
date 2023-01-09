import React from "react";
import "./BestOfWeekComponent.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./../brand/Card";

export default function RecordList({ filters, query }) {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`https://getinfluenced.onrender.com/api/tours/popular`);
      //console.log("http://localhost:3001/api/tours/popular");

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records.data.tours);
    }

    getRecords();

    return;
  }, []);

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Link
          to={`/influencerProfile?influencer=${record.username}`}
          style={{ textDecoration: "none" }}
        >
          <Card profile={record} auth={false} />
        </Link>
      );
    });
  }

  return <>{recordList()}</>;
}
