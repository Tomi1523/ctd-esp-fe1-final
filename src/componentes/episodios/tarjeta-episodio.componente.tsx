import './tarjeta-episodio.css';

interface Episodio {
    id: number,
    titulo: string,
    fecha: string,
    episodio: string,
}

interface TarjetaEpisodioProps {
    episodio: Episodio;
}


const TarjetaEpisodio = ({ episodio }: TarjetaEpisodioProps) => {
    return <div className="tarjeta-episodio">
        <div>
            <h4>{episodio.titulo}</h4>
            <span>({episodio.episodio})</span>
        </div>
        <span>Lanzado el: {episodio.fecha}</span>
    </div>
}

export default TarjetaEpisodio;