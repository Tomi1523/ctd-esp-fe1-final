import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../ReduxComponent/reduxComponent';
import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';

import { setDetalle } from '../../Slices/detalleReducer';
import { ToggleFavorito } from '../../Slices/favoritosReducer';

interface Personaje {
    id: number,
    nombre?: string,
    url?: string,
    imagen?: string,
    planeta?: string,
    genero?: string,
    episodios?: Array<string>,
}


interface TarjetaPersonajeProps {
    personaje: Personaje;
}

const TarjetaPersonaje = ({ personaje }: TarjetaPersonajeProps) => {

    const dispatch = useAppDispatch()
    const favoritosState = useAppSelector(state => state.favoritos)

    const navigate = useNavigate()

    const onClickFavorito = () => {
        dispatch(ToggleFavorito(personaje.id))
    }

    const onClickImg = () => {
        dispatch(setDetalle(personaje))
        navigate(`/detalle`)
    }


    const esFavorito = favoritosState.listado.includes(personaje.id)

    return <div className="tarjeta-personaje">
        <img onClick={onClickImg} src={personaje.imagen} alt={personaje.nombre}/>
        <div className="tarjeta-personaje-body">
            <span>{personaje.nombre}</span>
            <BotonFavorito onClick={onClickFavorito} esFavorito={esFavorito} />
        </div>
    </div>
}

export default TarjetaPersonaje;