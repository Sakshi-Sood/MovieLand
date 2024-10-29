import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';
import './App.css';

const API_URL = 'http://www.omdbapi.com?apikey=298efafe';


const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);

    const movieNames = ['Avengers', 'Inception', 'SpiderMan', 'The Matrix', 'Interstellar', 'MoneyHeist', 'Stranger Things', 'John Wick', 'Conjuring', 'The Nun', 'I'];

    const getRandomMovie = () => {
        const randomIndex = Math.floor(Math.random() * movieNames.length);
        return movieNames[randomIndex];
    };

    useEffect(() => {
        searchMovies(getRandomMovie());
    }, []);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    };

    return (
        <div className='app'>
            <h1>MovieLand</h1>

            <div className='search'>
                <input
                    value={searchTerm}
                    placeholder='Search for movies'
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {movies?.length > 0 ? (
                <div className='container'>
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ) : (
                <div className='empty'>
                    <h2> No movies found</h2>
                </div>
            )
            }
        </div>
    );
}

export default App;