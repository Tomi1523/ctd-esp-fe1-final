import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";
import {   resetFavoritos } from "../Slices/favoritosReducer";
import { useAppDispatch, useAppSelector } from "../ReduxComponent/reduxComponent";


/**
 * Componente de la página de favoritos.
 * Muestra la lista de personajes favoritos y permite eliminar todos los favoritos.
 */
const PaginaFavoritos = () => {
  const favoritos = useAppSelector((state) => state.favoritos);
  const dispatch = useAppDispatch();

  /**
   * Maneja el evento de restablecimiento de favoritos.
   * Envía una acción para eliminar todos los personajes de la lista de favoritos.
   */
  const handleResetFavoritos = () => {
    dispatch(resetFavoritos());
  };

  return (
    <div className="container">
      <div className="actions">
        <h3>Personajes Favoritos</h3>
        <button onClick={handleResetFavoritos} className="danger">
          Eliminar Favoritos
        </button>
      </div>
      <GrillaPersonajes personajes={favoritos.personajes} />
    </div>
  );
};

export default PaginaFavoritos;
