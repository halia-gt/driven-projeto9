import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/home.css";
import Title from "./Title";
import Image from "./Image";

export default function Home() {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        const url = 'https://mock-api.driven.com.br/api/v7/cineflex/movies';
        const promise = axios.get(url);

        promise.then((answer) => {
            setMovies(answer.data);
        })
    }, []);

    return (
        <section className="home">
            <Title>
                Selecione o filme
            </Title>
            <section className="movies-container">
                {movies.map((movie) => (
                    <Image key={movie.id}>
                        <Link to={`/filme/${movie.id}`}><img src={movie.posterURL} alt="movie" /></Link>
                    </Image>
                ))}
            </section>
        </section>
    );
}