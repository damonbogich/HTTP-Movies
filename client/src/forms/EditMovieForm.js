import React, {useState} from 'react';
import axios from 'axios';
import { useParams, Redirect, useHistory, Link } from "react-router-dom";
import MovieList from '../Movies/MovieList';


export default function EditMovieForm() {
    const params = useParams();
    const [movie, setMovie] = useState({id: params.id, title: "", director: "", metascore: "", stars: []});
    const history = useHistory();
    const handleChange = e => {
        e.preventDefault();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${params.id}`, movie)
        .then(res => {
            console.log(res)
            setMovie({...movie, title: '', director: '', metascore:'', stars: []})
            history.push('/')

        })
        .catch(err => console.log(err))
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Movie</h1>
            <label> Id
                <input
                    type='number'
                    name='id'
                    value={movie.id}
                    onChange={handleChange}
                />
            </label>
            <label> Title
                <input
                    type='text'
                    name='title'
                    value={movie.title}
                    onChange={handleChange}
                />
            </label>
            <label> Director
            <input
                    type='text'
                    name='director'
                    value={movie.director}
                    onChange={handleChange}
                />
            </label>
            <label> Metascore
            <input
                    type='text'
                    name='metascore'
                    value={movie.metascore}
                    onChange={handleChange}
                />
            </label>
            <button>Submit</button> 
        </form>
    )
};