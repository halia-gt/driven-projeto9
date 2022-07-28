import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Title from "./Title";
import Footer from "./Footer";
import "../assets/css/seats.css";
import Forms from "./Forms";
import Spinner from "./Spinner";

function Seat({ id, name, isAvailable, seatsId, setSeatsId }) {
    const [selected, setSelected] = useState(false);
    let classColor = 'seat-circle';

    if (isAvailable && !selected) {
        classColor += ' available';
    } else if (isAvailable && selected) {
        classColor += ' selected';
    } else {
        classColor += ' unavailable';
    }

    function chooseSeat() {
        setSelected(!selected);

        if (seatsId.includes(id)) {
            const arrayAux = [...seatsId];

            for( let i = 0; i < arrayAux.length; i++){         
                if ( arrayAux[i] === id) { 
                    arrayAux.splice(i, 1); 
                }
            }

            setSeatsId(arrayAux);
        } else {
            setSeatsId([...seatsId, id]);
        }
    }

    return (
        <li className={classColor} onClick={isAvailable ? (chooseSeat) : (() => {alert('Esse assento não está disponível');})}>
            {name}                        
        </li>
    );
}

export default function Seats() {
    const [seats, setSeats] = useState({});
    const { sessionId } = useParams();
    const [seatsId, setSeatsId] = useState([]);
    const [document, setDocument] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${sessionId}/seats`;
        const promise = axios.get(url);

        promise.then((answer) => {
            setSeats(answer.data);
        })
    }, [sessionId]);

    function requestTickets(e) {
        e.preventDefault();

        if (seatsId.length > 0) {
            const url = 'https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many';
            const ticket = {
                ids: seatsId,
                name: name,
                cpf: document
            }
            console.log(ticket);
            // const promise = axios.post(url, ticket);
            // promise.catch(error => {console.log(error)});
        } else {
            alert('Escolha os assentos');
        }
    }

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
                            <Seat key={seat.id} {...seat} seatsId={seatsId} setSeatsId={setSeatsId} />
                        ))}
                    </ul>
                    <div className="seats-status-container">
                        <div className="seats-status">
                            <div className="seat-circle selected"></div>
                            <p>Selecionado</p>
                        </div>
                        <div className="seats-status">
                            <div className="seat-circle available"></div>
                            <p>Disponível</p>
                        </div>
                        <div className="seats-status">
                            <div className="seat-circle unavailable"></div>
                            <p>Indisponível</p>
                        </div>
                    </div>
                    <Forms document={document} setDocument={setDocument} name={name} setName={setName} requestTickets={requestTickets} />
                    <Footer sourceImage={seats.movie.posterURL}>
                        <p>{seats.movie.title}</p>
                        <p>{seats.day.weekday} - {seats.name}</p>
                    </Footer>
                </>
            )}
        </section>
    );
}