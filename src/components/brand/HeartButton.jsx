import React, {useState, useEffect} from "react";

import Favorite from '@mui/icons-material/Favorite';
import IconButton from "@mui/material/IconButton";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

const theme = createTheme({/* kalbin rengini turuncu yapmak icin */
    palette: {
        orange: {
            main: '#FF4820'
        }
    }
});

export default function HeartButton({ status, infUsername } ) {
    
    const [liked, setLiked] = useState(status);
    const [fav, setFav] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");



    let email = null;
          
    if (sessionStorage.getItem("session") !== null) 
        email = JSON.parse(sessionStorage.getItem("session")).passport.user.email;

    console.log(infUsername);
    console.log("email: " + email);

    console.log(typeof(email));
    console.log(typeof(infUsername));
    





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
          setFav(result.data);
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

          for (let i = 0; i < fav.length; i++) {
            console.log(fav[i].username + " " + infUsername);
            if(fav[i].username === infUsername)
                setLiked(true);
          }
    
        }
    
      }, [fav]); // favorilerden cikar yapinca rerender olacak mı?









    const handleIconClick = (id) => {/* databaseden beğeniler cekilirken burası kullanılabilir mi kalbi doğru renderlamak icin? */
        setLiked((prev) => !prev);
        
        console.log(liked);
        
        // true unliked
        // false liked        
        
        const handleLike = async () => {{ // isimler karismis bu begenme oluyor
            const response = await fetch(`https://getinfluenced.onrender.com/api/users/update/favorites`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email" : email, 
                    "toAdd" : [infUsername],
                }),
            })
            console.log("liked");
        }}
        
        const handleUndoLike = async () => {{ // isimler karismis bu begenme oluyor
            const response = await fetch(`https://getinfluenced.onrender.com/api/users/update/favorites`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email" : email, 
                    "toDelete" : [infUsername],
                }),
            })
            console.log("Undo like");
        }}


        if (!liked && email !== null) handleLike();
        else if(liked && email !== null) handleUndoLike();

    }



    return (
        <ThemeProvider theme={theme}>
            <IconButton onClick={handleIconClick}>
                {liked
                    ? <Favorite color="orange" fontSize="large"/>
                    : <FavoriteBorder color="orange" fontSize="large"/>}
            </IconButton>
        </ThemeProvider>
    );
}

/* import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import { withStyles } from "@mui/material/styles"; */

{/*        iconProps={{ iconName: 'favorite_border' }}
        styles={{
          icon: {color: 'white', fontSize: 72},
          root: {
            width: 100,
            height: 100,
            backgroundColor: 'black',
            selectors: {
              ':hover .ms-Button-icon': {
                color: 'red'
              },
              ':active .ms-Button-icon': {
                color: 'yellow'
              }
            }
          },
          rootHovered: {backgroundColor: 'black'},
          rootPressed: {backgroundColor: 'black'}
        }}*/
}
{/* <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
 */
}
/* export default function HeartButton() {

    return (
        <Fab disabled aria-label="like">
            <FavoriteIcon />
        </Fab>
    );
} */