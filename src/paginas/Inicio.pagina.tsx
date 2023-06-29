import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { useAppDispatch, useAppSelector } from "../ReduxComponent/reduxComponent";
import { resetFiltro } from "../Slices/personajesReducer";
 
/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 * 
 * Uso: 
 * ``` <PaginaInicio /> ```
 * 
 * @returns la pagina de inicio
 */
const PaginaInicio = () => {

    const { personajes} = useAppSelector(state => state.personajes)
    const dispatch = useAppDispatch()

    const handleResetFiltro = () => {
        dispatch(resetFiltro());
      };
    
      return (
        <div className="container">
          <div className="actions">
            <h3>Catálogo de Personajes</h3>
            <button onClick={handleResetFiltro} className="danger">
              Limpiar filtros
            </button>
          </div>
          <Filtros />
          <Paginacion />
          <div className="grilla-contenedor">
            <GrillaPersonajes personajes={personajes} />
          </div>
          <Paginacion />
        </div>
      );
}

export default PaginaInicio