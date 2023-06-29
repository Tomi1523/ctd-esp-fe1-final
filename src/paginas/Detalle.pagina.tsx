import "./Detalle.css";
import BotonFavorito from "../componentes/botones/boton-favorito.componente";
import TarjetaEpisodio from "../componentes/episodios/tarjeta-episodio.componente";
import { useAppDispatch, useAppSelector } from "../ReduxComponent/reduxComponent";
import { ToggleFavorito} from "../Slices/favoritosReducer";
import { Link } from "react-router-dom";


const PaginaDetalle = () => {
    const { personaje, episodios } = useAppSelector((state) => state.detalle);
    const favoritos = useAppSelector((state) => state.favoritos);
    const dispatch = useAppDispatch();
  
    if (personaje.id === -1) {
      return (
        <div className="container">
          <h3>Seleccione un personaje para ver sus datos</h3>
          <Link to="/">Ver listado</Link>
        </div>
      );
    }
  
    return (
      <div className="container">
        
        <div className="detalle">
          <div className="detalle-header">
            <img src={personaje.imagen} />
            <div className="detalle-header-texto">
              <p>Nombre: {personaje.nombre}</p>
              <p>Planeta: {personaje.planeta}</p>
              <p>Genero: {personaje.genero}</p>
            </div>
            <BotonFavorito
              onClick={() => dispatch(ToggleFavorito(personaje.id))}
              esFavorito={favoritos.listado.includes(personaje.id)}
            />
          </div>
        </div>
        <h4>Episodios del personaje</h4>
        <div className="episodios-grilla">
          {episodios.map((episodio, j) => (
            <TarjetaEpisodio key={j} episodio={episodio} />
          ))}
        </div>
      </div>
    );
  };
  
  export default PaginaDetalle;
  