import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";
import {   resetFavoritos } from "../Slices/favoritosReducer";
import { useAppDispatch, useAppSelector } from "../ReduxComponent/reduxComponent";


const PaginaFavoritos = () => {
    
    const favoritos = useAppSelector(state => state.favoritos)
    const dispatch = useAppDispatch()

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
    
    


export default PaginaFavoritos