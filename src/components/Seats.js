import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Title from "./Title";
import Footer from "./Footer";
import "../assets/css/seats.css";
import Forms from "./Forms";
import Spinner from "./Spinner";

function Seat({ id, name, isAvailable, seatsId, setSeatsId, seatsName, setSeatsName }) {
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
            const arrayAux1 = [...seatsId];
            const arrayAux2 = [...seatsName];

            for( let i = 0; i < arrayAux1.length; i++){         
                if ( arrayAux1[i] === id) { 
                    arrayAux1.splice(i, 1); 
                    arrayAux2.splice(i, 1);
                }
            }

            setSeatsId(arrayAux1);
            setSeatsName(arrayAux2);
        } else {
            setSeatsId([...seatsId, id]);
            setSeatsName([...seatsName, name]);
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
    const [seatsName, setSeatsName] = useState([]);
    const [document, setDocument] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${sessionId}/seats`;
        const promise = axios.get(url);

        promise.then((answer) => {
            setSeats(answer.data);
        })
    }, [sessionId]);

    function handleSubmit(e) {
        e.preventDefault();

        if (seatsId.length > 0) {
            const url = 'https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many';
            const objTicket = {
                ids: seatsId,
                name: name,
                cpf: document
            }

            const ticket = {
                movie: seats.movie.title,
                date: seats.day.date,
                time: seats.name,
                seats: [...seatsName],
                name: name,
                cpf: document
            }

            const promise = axios.post(url, objTicket);
            promise.catch(error => {console.log(error)});
            promise.then(answer => {
                navigate('/sucesso', {
                    replace: true,
                    state: ticket
                })});
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
                            <Seat key={seat.id} {...seat} seatsId={seatsId} setSeatsId={setSeatsId} seatsName={seatsName} setSeatsName={setSeatsName} />
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
                    <Forms document={document} setDocument={setDocument} name={name} setName={setName} handleSubmit={handleSubmit} />
                    <Footer sourceImage={seats.movie.posterURL}>
                        <p>{seats.movie.title}</p>
                        <p>{seats.day.weekday} - {seats.name}</p>
                    </Footer>
                </>
            )}
        </section>
    );
}