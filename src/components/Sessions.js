import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Title from "./Title";
import "../assets/css/sessions.css";
import Button from "./Button";
import Footer from "./Footer";
import { useEffect } from "react";
import Spinner from "./Spinner";

export default function Sessions() {
    const [movie, setMovie] = useState({});
    const { movieId } = useParams();

    
    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`;
        const promise = axios.get(url);

        promise.then((answer) => {
            setMovie(answer.data);
        })
    }, []);

    return (
        <section className="sessions">
            <Title>
                Selecione o horário
            </Title>
            {(Object.keys(movie).length === 0) ? (
                <Spinner />
            ) : (
                <>
                    <section className="sessions-selection">
                        {movie.days.map((day) => (
                            <div key={day.id}>
                                <h3>{day.weekday} - {day.date}</h3>
                                <div className="time-buttons">
                                    {day.showtimes.map((time) => (
                                        <Button key={time.id} classExtra="margin">{time.name}</Button>
                                    ))}
                                </div>
                            </div>
                        ))}

                    </section>
                    <Footer sourceImage={movie.posterURL}>
                        <p>{movie.title}</p>
                    </Footer>
                </>
            )}
            

        </section>
    );
}