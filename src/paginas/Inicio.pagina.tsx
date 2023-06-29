import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { useAppDispatch, useAppSelector } from "../ReduxComponent/reduxComponent";
import { resetFiltro } from "../Slices/personajesReducer";
 

/**
 * Componente de la página de inicio.
 * Muestra el catálogo de personajes con opciones de filtrado y paginación.
 */
const PaginaInicio = () => {
  const { personajes } = useAppSelector((state) => state.personajes);
  const dispatch = useAppDispatch();

  /**
   * Maneja el evento de restablecimiento del filtro.
   * Envía una acción para limpiar el filtro de personajes.
   */
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
};

export default PaginaInicio;
