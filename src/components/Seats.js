import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReturnButton from "./common/ReturnButton";
import axios from "axios";
import Title from "./Title";
import Footer from "./Footer";
import "../assets/css/seats.css";
import Forms from "./Forms";
import Button from "./Button";
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
        const foundId = seatsId.some(element => element.id === id);
        if (foundId && window.confirm('Deseja remover esse assento e apagar os dados preenchidos?')) {

            const arrayAux = [...seatsId];

            for( let i = 0; i < arrayAux.length; i++){         
                if ( arrayAux[i].id === id) { 
                    arrayAux.splice(i, 1); 
                }
            }

            setSeatsId(arrayAux);
            setSelected(false);
        } else if(!foundId) {
            setSeatsId([...seatsId, {id: id, seatName: name}]);
            setSelected(true);
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
    const navigate = useNavigate();

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${sessionId}/seats`;
        const promise = axios.get(url);

        promise.then((answer) => {
            setSeats(answer.data);
        });
    }, [sessionId]);

    function handleSubmit(e) {
        e.preventDefault();

        if (seatsId.length > 0) {
            const url = 'https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many';
            const buyers = seatsId.map((item) => (
                {
                    idAssento: item.id,
                    nome: item.name,
                    cpf: item.cpf
                }
            ));
            const ids = seatsId.map((item) => item.id);

            const body = {
                ids: ids,
                compradores: buyers
            }

            const seatsName = seatsId.map((item) => item.seatName);

            const ticket = {
                id: seats.id,
                movie: seats.movie.title,
                date: seats.day.date,
                time: seats.name,
                seats: seatsName,
                buyers: buyers
            }

            console.log(seats);

            const promise = axios.post(url, body);
            promise.catch(error => {console.log(error)});
            promise.then(answer => {
                navigate('/sucesso', {
                    replace: true,
                    state: ticket
                })}
            );
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
                    <ReturnButton returnTo={`/filme/${seats.movie.id}`} />
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
                    <form onSubmit={handleSubmit}>
                        {seatsId.map((seat) => (
                            <Forms key={seat.id}  {...seat} seatsId={seatsId} setSeatsId={setSeatsId} />
                        ))}
                        <Button classExtra="main-button" type="submit">
                            Reservar assento(s)
                        </Button>
                    </form>
                    <Footer sourceImage={seats.movie.posterURL}>
                        <p>{seats.movie.title}</p>
                        <p>{seats.day.weekday} - {seats.name}</p>
                    </Footer>
                </>
            )}
        </section>
    );
}