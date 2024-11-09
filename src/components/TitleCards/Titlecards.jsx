/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import "./TitleCards.css"
import cards_data from "../../assets/cards/Cards_data"
import { Link } from 'react-router-dom';



const Titlecards = ({title,category}) => {

  const[apiData,setapiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTMzZDJlOGJmMTQ2OTQ1MjU4NDFmY2U5MGM0MTU2MCIsInN1YiI6IjY2NGVhNzY2NDlhMmJmZDcyNTkzMTIzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.byKD-l7Mtc86cisSU8oX389J6JEVNZVcR1ZiZBipKUY'
    }
  };
  
  const handlewheel = (event)=>{
    event.preventDefault;1
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}`, options)
    .then(response => response.json())
    .then(response => setapiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handlewheel);
  },[])

  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list"  ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default Titlecards
