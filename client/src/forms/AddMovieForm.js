import React, {useState} from 'react';
import axios from 'axios';
import { useParams, Redirect, useHistory, Link } from "react-router-dom";



export default function AddMovieForm() {
    const params = useParams();
    const [movie, setMovie] = useState({title: "", director: "", metascore: "", stars: [], newStar: ""});
    const history = useHistory();
    const handleChange = e => {
        e.preventDefault();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    };

    const addStar = (e) => {
        e.preventDefault();
        setMovie({...movie, stars: [...movie.stars, movie.newStar], newStar: ""})
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/movies`, movie)
        .then(res => {
            console.log(res)
            setMovie({...movie, title: '', director: '', metascore:'', stars: []})
            history.push('/')

        })
        .catch(err => console.log(err))
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Movie</h1>
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
            <label> Add Star
            <input
                    type='text'
                    name='newStar'
                    value={movie.newStar}
                    onChange={handleChange}
                />
            </label>
            <button onClick={addStar}>Add Star</button>
            <button>Submit</button> 
        </form>
    )
};