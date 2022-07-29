import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { IoIosReturnLeft } from "react-icons/io";
import axios from "axios";
import Title from "./Title";
import "../assets/css/sessions.css";
import Button from "./Button";
import Footer from "./Footer";
import Spinner from "./Spinner";

export default function Sessions() {
    const [movie, setMovie] = useState({});
    const { movieId } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v7/cineflex/movies/${movieId}/showtimes`;
        const promise = axios.get(url);

        promise.then((answer) => {
            setMovie(answer.data);
        })
    }, [movieId]);

    return (
        <section className="sessions">
            <IconContext.Provider value={{ color: "#E8833A", size: "2em", className: "react-icon" }}>
                <IoIosReturnLeft onClick={() => { navigate('/') }}/>
            </IconContext.Provider>
            {(Object.keys(movie).length === 0) ? (
                <Spinner />
            ) : (
                <>
                    <Title>
                        Selecione o horário
                    </Title>
                    <section className="sessions-selection">
                        {movie.days.map((day) => (
                            <div key={day.id}>
                                <h3>{day.weekday} - {day.date}</h3>
                                <div className="time-buttons">
                                    {day.showtimes.map((time) => (
                                        <Link to={`/sessao/${time.id}`} key={time.id}>
                                            <Button key={time.id} classExtra="margin-right">{time.name}</Button>
                                        </Link>
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