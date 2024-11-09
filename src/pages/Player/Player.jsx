/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import "./Player.css"
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData,setapiData] = useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTMzZDJlOGJmMTQ2OTQ1MjU4NDFmY2U5MGM0MTU2MCIsInN1YiI6IjY2NGVhNzY2NDlhMmJmZDcyNTkzMTIzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.byKD-l7Mtc86cisSU8oX389J6JEVNZVcR1ZiZBipKUY'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
      .then(response => response.json())
      .then(response => setapiData(response.results[0]))
      .catch(err => console.error(err));
  }, [])


  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
      <iframe width="90%" height="90%" title='trailer' src={`https://www.youtube.com/embed/${apiData.key}`} frameborder="0" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
