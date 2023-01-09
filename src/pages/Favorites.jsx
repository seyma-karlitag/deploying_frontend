import React from "react";
import InfluencerFavoritesCard from "../components/influencerFavoritesCard/InfluencerFavoritesCard";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "./indexPages.css";
import "./favorites.css";
import { SettingsPowerRounded } from "@mui/icons-material";

export function Favorites() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let email = null;
  if (sessionStorage.getItem("session") !== null)  {
      email = JSON.parse(sessionStorage.getItem("session")).passport.user.email;

      const favs = JSON.parse(sessionStorage.getItem("session"))
  }

  const getFavorites = async () => {
    setIsLoading(true);

    console.log("getFavorites calisti");

    try {
      const response = await fetch(`https://getinfluenced.onrender.com/api/users/get-favorites`, {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              "email" : email, 
          }),
      })

      if(!response.ok) {
        console.log("alınmadı");
        throw new Error(`error! status: ${response.status}`);
      }

      const result = await response?.json();
      console.log("alindi");
      setUsers(result.data);
      console.log(result.data);

    } catch(err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (email !== null) {
      getFavorites();
    }
    

  }, [users]); // favorilerden cikar yapinca rerender olacak mı?





  /*   if (users.length <= 0) {
    return <>There are no users</>;
  } */

  return (
    <div className="favoritesMain">
      <div className="favoritesTitle-div">
        <h3 className="favoritesTitle">FAVORİLER</h3>
      </div>

      <div className="favoritesContainer-wrapper">
        <div className="favoritesContainer">
            {users.map((item, index) => (
            <Link
              to={`/influencerProfile?influencer=${item.username}`}
              style={{ textDecoration: "none" }}
            >
              <InfluencerFavoritesCard
                infCard={item}
                key={item.username}
              />
            </Link>
          ))}  
        </div>
      </div>

      <div className="favoritesFooter"></div>
    </div>
  );
}

/* const infCard1 = {
  "image": "N/A",
  "name": "isim soyisim",
  "username": "@kullanciadi",
  "categories": "kategori1, kategori2, kategori3",
  "gonderi": "250",
  "takipci": "243,25K",
  "takip": "153",
  "point": "8,11"
} */

/* Promise.all(fetches).then(function () {
  console.log("feçç:  " + fetches[0].data.tour.username);
    
    console.log (array.length);
  });

  return (
    <div>
        <InfluencerFavoritesCard infCard={fetches[0].data.tour} />
    </div>
   );
 */

/* async function ListFavorites() {

  let array = new Array;
  var fetches = [];
  

  for (let i = 0; i < favoritesList.length; i++) {
    console.log(favoritesList[i]);

    let uname = favoritesList[i];

    fetches.push(
      fetch(`http://localhost:3001/api/users/${uname}`)
      .then(res => {return res.text(); })
        .then(res => {
            array.push(res);
            console.log(res);
          }
      )
    );
  }

  
  Promise.all(fetches).then(function () {
    console.log(fetches);
    console.log("sadsad" + array[0]);
    console.log(array.length);
  });

  return (
    <div>
      {array.map(item => (< InfluencerFavoritesCard  infCard = { item } /> ))}
    </div>
  );

}
 */

/* function ListFavorites() {
  GetInfluencerByID();
  console.log(listfav);

  async function GetInfluencerByID() {
    for (let i = 0; i < favoritesList.length; i++) {
      const uname = favoritesList[i];
      console.log("GETID: " + uname);
      const response = await fetch(`http://localhost:3001/api/users/${uname}`);    
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const record = await response.json();
      console.log(record.data.tour.username + " ben burdayim");
      listfav.push(record.data.tour);
      console.log("asdas listfav[0]:" + listfav[0].username);
    }
  }

  function recordList() {
  console.log(listfav);

    return listfav.map((record) => {
      return (
          <InfluencerFavoritesCard infCard={record.data.tour} />
      );
    });
  }
    
  return (
      <>
        {recordList()}
      </>
  ); 
}
 */

/*    async function getFavorites() {
      let response = false;

        response = await fetch(`http://localhost:3001/api/users/${fav_list[0]}`);

        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const temp = await response.json();
        tempUsersCollection.push(temp.data.tour);
        setUsers(tempUsersCollection);


      
        console.log(tempUsersCollection);
        setUsers(tempUsersCollection);
    }

    getFavorites();
    return;
  }, []);*/

/*
function Favs() {
  const [users, setUsers] = useState([]);
  const fav_list = ["cagritaner", "acunilicali", "neslihanatagul"];

  useEffect(() => {
    const tempUsersCollection = [];

    async function getFavorites() {
      let response = false;

      fav_list.map(async (x, i) => {
        response = await fetch(`http://localhost:3001/api/users/${x}`);

        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const temp = await response.json();
        tempUsersCollection.push(temp.data.tour);
        console.log(tempUsersCollection);
        setUsers(tempUsersCollection);

      })
    }

    getFavorites();
    return;
  }, []);

  function favoritesList() {
    return users.map((item, index) => {
      return (
        <InfluencerFavoritesCard infCard={item} key={`influencer-${item.username}-${index}`} />          
      );
    });
  };
  
  return (
    <>
      {favoritesList()}
    </>
  );
}*/