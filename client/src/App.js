import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';

import EditMovieForm from './forms/EditMovieForm';
import AddMovieForm from './forms/AddMovieForm';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };


  return (
    <>
      <Link to='/add-movie'>Add Movie</Link>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} getMovieList={getMovieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>

      <Route path="/update-movie/:id">
        <EditMovieForm movieList={movieList} setMovieList={setMovieList} />
      </Route>

      <Route path="/add-movie">
        <AddMovieForm movieList={movieList} setMovieList={setMovieList} />
      </Route>
    </>
  );
};

export default App;
