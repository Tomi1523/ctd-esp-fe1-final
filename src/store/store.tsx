import { configureStore } from "@reduxjs/toolkit";
import favoritosReducer from "../Slices/favoritosReducer";
import personajesReducer from "../Slices/personajesReducer";
import detalleReducer from "../Slices/detalleReducer";

const store = configureStore({
    reducer: {
        detalle: detalleReducer,
        personajes: personajesReducer,
        favoritos: favoritosReducer, 
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;