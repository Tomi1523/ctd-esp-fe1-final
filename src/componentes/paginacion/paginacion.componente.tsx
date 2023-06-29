import { useAppDispatch, useAppSelector } from '../../ReduxComponent/reduxComponent';
import { fetchNextPersonajes, fetchPrevPersonajes } from '../../Slices/personajesReducer';
import './paginacion.css';

/**
 * Componente que contiene los botones para paginar
 * 
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 * 
 * 
 * @returns un JSX element 
 */
const Paginacion = () => {

    const { prev, next } = useAppSelector(state => state.personajes);
    const dispatch = useAppDispatch()

    const disabledPrev = prev === null;
    const disabledNext = next === null;

    const handlePrev = () => {
        dispatch(fetchPrevPersonajes())
    }

    const handleNext = () => {
        dispatch(fetchNextPersonajes())
    }

    return <div className="paginacion">
        <button onClick={handlePrev} disabled={disabledPrev} className={"primary"}>Anterior</button>
        <button onClick={handleNext} disabled={disabledNext} className={"primary"}>Siguiente</button>
    </div>
}

export default Paginacion;