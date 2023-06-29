import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFavoritos, eliminarFavoritos, toggleFavorito } from '../api/ApiFavoritos';
import { RootState } from '../store/store';
import { personajesArray } from '../api/ApiPersonajes';

/**
 * Interfaz que representa un personaje.
 * @interface
 * @property {number} id - El ID del personaje.
 * @property {string} [nombre] - El nombre del personaje.
 * @property {string} [url] - La URL del personaje.
 * @property {string} [imagen] - La URL de la imagen del personaje.
 * @property {string} [planeta] - El nombre del planeta del personaje.
 * @property {string} [genero] - El género del personaje.
 * @property {string[]} [episodios] - Los episodios en los que aparece el personaje.
 */
interface Personaje {
  id: number;
  nombre?: string;
  url?: string;
  imagen?: string;
  planeta?: string;
  genero?: string;
  episodios?: string[];
}

/**
 * Interfaz que representa el estado de los favoritos.
 * @interface
 * @property {number[]} listado - El listado de IDs de personajes favoritos.
 * @property {Personaje[]} personajes - Los personajes favoritos.
 */
interface FavoritosState {
  listado: number[];
  personajes: Personaje[];
}

/**
 * Estado inicial de los favoritos.
 */
const initialState: FavoritosState = {
  listado: [],
  personajes: [],
};

/**
 * Función asíncrona que obtiene los favoritos.
 * @type {AsyncThunk<number[], void, {}>}
 */
const Favoritos = createAsyncThunk('favoritos/fetchFavoritos', async () => {
  const response = getFavoritos();
  return response;
});

/**
 * Función asíncrona que alterna el estado de favorito de un personaje.
 * @type {AsyncThunk<number[], number, {}>}
 */
const ToggleFavorito = createAsyncThunk('favoritos/fetchToggleFavorito', async (id: number) => {
  const response = toggleFavorito(id);
  return response;
});

/**
 * Función asíncrona que obtiene los personajes favoritos.
 * @type {AsyncThunk<Personaje[], void, { state: RootState }>}
 */
const PersonajesFavoritos = createAsyncThunk('favoritos/fetchPersonajesFavoritos', async (_, { getState }) => {
  const state = getState() as RootState;
  const { listado } = state.favoritos;
  const response = personajesArray(listado);
  return response;
});

/**
 * Función asíncrona que elimina todos los favoritos.
 * @type {AsyncThunk<number[], void, {}>}
 */
const resetFavoritos = createAsyncThunk('favoritos/fetchResetFavoritos', async () => {
  const response = eliminarFavoritos();
  return response;
});

/**
 * Slice de los favoritos.
 */
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

export { resetFavoritos, PersonajesFavoritos, ToggleFavorito, Favoritos };
export default favoritosSlice.reducer;
