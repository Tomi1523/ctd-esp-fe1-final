
import { Routes, Route } from "react-router-dom";
import './App.css';
import PaginaInicio from "./paginas/Inicio.pagina";
import PaginaFavoritos from "./paginas/Favoritos.pagina";
import PaginaDetalle from "./paginas/Detalle.pagina";
import Encabezado from "./componentes/layout/encabezado.componente";
import { Episodios } from './Slices/detalleReducer';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "./ReduxComponent/reduxComponent";
import { Favoritos, PersonajesFavoritos } from "./Slices/favoritosReducer";


function App() {

  const dispatch = useAppDispatch()
  const detalle = useAppSelector(state => state.detalle)
  const favoritos = useAppSelector(state => state.favoritos)
  
  useEffect(() => {
      dispatch(Favoritos())
  }, [])

  useEffect(() => {
      dispatch(PersonajesFavoritos())
  }, [favoritos.listado])

  useEffect(() => {
      if (detalle.personaje.id != -1) {
          dispatch(Episodios())
      }
  }, [detalle.personaje])

  return (
      <div className="App">
          <Encabezado />
          <Routes>
              <Route path="/" element={<PaginaInicio />} />
              <Route path="favoritos" element={<PaginaFavoritos />} />
              <Route path="detalle" element={<PaginaDetalle />} />
          </Routes>
      </div>
  );
}

export default App;