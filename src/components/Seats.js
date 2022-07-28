import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Title from "./Title";
import Footer from "./Footer";
import "../assets/css/seats.css";
import Forms from "./Forms";
import Button from "./Button";
import Spinner from "./Spinner";

export default function Seats() {
    const [seats, setSeats] = useState({});
    const { sessionId } = useParams();

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`;
        const promise = axios.get(url);

        promise.then((answer) => {
            console.log(answer.data.seats);
            setSeats(answer.data);
        })
    }, [sessionId])

    return (
        <section className="seats">
            {(Object.keys(seats).length === 0) ? (
                <Spinner />
            ) : (
                <>
                    <Title>
                        Selecione o(s) assento(s)
                    </Title>
                    <ul className="seats-container">
                        {seats.seats.map(seat => (
                            <li key={seat.id} className="seat-circle">
                                {seat.id}                        
                            </li>
                        ))}
                    </ul>
                    <div className="seats-status-container">
                        <div className="seats-status">
                            <div className="seat-circle selected"></div>
                            <p>Selecionado</p>
                        </div>
                        <div className="seats-status">
                            <div className="seat-circle avaliable"></div>
                            <p>Disponível</p>
                        </div>
                        <div className="seats-status">
                            <div className="seat-circle unavaliable"></div>
                            <p>Indisponível</p>
                        </div>
                    </div>
                    <Forms />
                    <Button classExtra="main-button">
                        Reservar assento(s)
                    </Button>
                    <Footer sourceImage={seats.movie.posterURL}>
                        <p>{seats.movie.title}</p>
                        <p>{seats.day.weekday} - {seats.name}</p>
                    </Footer>
                </>
            )
        
            }

        </section>
    );
}