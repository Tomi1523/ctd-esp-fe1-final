
import './filtros.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchFilterPersonajes, setFiltro } from '../../Slices/personajesReducer';
import { useAppDispatch, useAppSelector } from '../../ReduxComponent/reduxComponent';

const Filtros = () => {

    const filtro = useAppSelector(state => state.personajes.filtro)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (filtro != undefined) {
            dispatch(fetchFilterPersonajes(filtro))
        }
    }, [filtro])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFiltro(e.target.value))
    }

    return <div className="filtros">
        <label htmlFor="nombre">Filtrar por nombre:</label>
        <input onChange={onChange} value={filtro} type="text" placeholder="Rick, Morty, Beth, Alien, ...etc" name="nombre" />
    </div>
}

export default Filtros;