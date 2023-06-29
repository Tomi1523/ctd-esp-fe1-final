import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFavoritos, eliminarFavoritos, toggleFavorito } from '../api/ApiFavoritos';
import { RootState } from '../store/store';
import { personajesArray } from '../api/ApiPersonajes';

interface Personaje {
  id: number;
  nombre?: string;
  url?: string;
  imagen?: string;
  planeta?: string;
  genero?: string;
  episodios?: Array<string>;
}

interface FavoritosState {
  listado: Array<number>;
  personajes: Array<Personaje>;
}

const initialState: FavoritosState = {
  listado: [],
  personajes: [],
};

 const Favoritos = createAsyncThunk(
'favoritos/fetchFavoritos', async () => {
  const response = getFavoritos();
  return response;
});

 const ToggleFavorito = createAsyncThunk(
  'favoritos/fetchToggleFavorito',
  async (id: number) => {
    const response = toggleFavorito(id);
    return response;
  }
);

const PersonajesFavoritos = createAsyncThunk(
  'favoritos/fetchPersonajesFavoritos',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { listado } = state.favoritos;
    const response = personajesArray(listado);
    return response;
  }
);

 const resetFavoritos = createAsyncThunk(
'favoritos/fetchResetFavoritos', async () => {
  const response = eliminarFavoritos();
  return response;
});

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Favoritos.fulfilled, (state, action) => {
        state.listado = action.payload;
      })
      .addCase(ToggleFavorito.fulfilled, (state, action) => {
        state.listado = action.payload;
      })
      .addCase(PersonajesFavoritos.fulfilled, (state, action) => {
        state.personajes = action.payload;
      })
      .addCase(resetFavoritos.fulfilled, (state, action) => {
        state.listado = action.payload;
      });
  },
});
export {resetFavoritos,PersonajesFavoritos,ToggleFavorito,Favoritos}
export default favoritosSlice.reducer;
