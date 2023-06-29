import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ObtenerPersonajes, ObtenerPersonajesFiltrados, obtenerPersonajesPag } from '../api/ApiPersonajes'
import { RootState } from '../store/store';

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
 * Interfaz que representa el estado de los personajes.
 * @interface
 * @property {string | null} next - URL de la página siguiente.
 * @property {string | null} prev - URL de la página anterior.
 * @property {Personaje[]} personajes - Lista de personajes.
 * @property {string} filtro - Filtro de búsqueda.
 */
interface PersonajesState {
  next: string | null;
  prev: string | null;
  personajes: Personaje[];
  filtro: string;
}

/**
 * Estado inicial de los personajes.
 */
const initialState: PersonajesState = {
  next: null,
  prev: null,
  personajes: [],
  filtro: '',
};

/**
 * Función asíncrona que obtiene los personajes filtrados.
 * @type {AsyncThunk<{ prev: string | null, next: string | null, personajes: Personaje[] }, string>}
 */
const fetchFilterPersonajes = createAsyncThunk(
  'personajes/fetchFilterPersonajes',
  async (filter: string) => {
    const response = await ObtenerPersonajesFiltrados(filter);
    return response;
  }
);

/**
 * Función asíncrona que obtiene todos los personajes.
 * @type {AsyncThunk<{ prev: string | null, next: string | null, personajes: Personaje[] }, void>}
 */
const fetchPersonajes = createAsyncThunk(
  'personajes/fetchPersonajes',
  async () => {
    const response = await ObtenerPersonajes();
    return response;
  }
);

/**
 * Función asíncrona que obtiene la página anterior de personajes.
 * @type {AsyncThunk<{ prev: string | null, next: string | null, personajes: Personaje[] }, void, { state: RootState }>}
 */
const fetchPrevPersonajes = createAsyncThunk(
  'personajes/fetchPrevPersonajes',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { prev } = state.personajes;

    if (!prev) {
      return rejectWithValue("Lo sentimos no hay más personajes");
    }

    const response = await obtenerPersonajesPag(prev);
    return response;
  }
);

/**
 * Función asíncrona que obtiene la página siguiente de personajes.
 * @type {AsyncThunk<{ prev: string | null, next: string | null, personajes: Personaje[] }, void, { state: RootState }>}
 */
const fetchNextPersonajes = createAsyncThunk(
  'personajes/fetchNextPersonajes',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { next } = state.personajes;

    if (!next) {
      return rejectWithValue("Lo sentimos no hay más personajes");
    }

    const response = await obtenerPersonajesPag(next);
    return response;
  }
);

/**
 * Slice de Redux que administra el estado de los personajes.
 * @type {Slice<PersonajesState>}
 */
const personajesSlice = createSlice({
  name: 'personajes',
  initialState,
  reducers: {
    /**
     * Acción para establecer el filtro de búsqueda de personajes.
     * @param {PersonajesState} state - Estado actual de los personajes.
     * @param {PayloadAction<string>} action - Acción con el filtro de búsqueda.
     */
    setFiltro(state, action: PayloadAction<string>) {
      state.filtro = action.payload;
    },
    /**
     * Acción para restablecer el filtro de búsqueda de personajes.
     * @param {PersonajesState} state - Estado actual de los personajes.
     */
    resetFiltro(state) {
      state.filtro = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPersonajes.fulfilled, (state, action) => {
        const { prev, next, personajes } = action.payload;
        state.prev = prev;
        state.next = next;
        state.personajes = personajes;
      })
      .addCase(fetchNextPersonajes.fulfilled, (state, action) => {
        const { prev, next, personajes } = action.payload;
        state.prev = prev;
        state.next = next;
        state.personajes = personajes;
      })
      .addCase(fetchPrevPersonajes.fulfilled, (state, action) => {
        const { prev, next, personajes } = action.payload;
        state.prev = prev;
        state.next = next;
        state.personajes = personajes;
      })
      .addCase(fetchFilterPersonajes.fulfilled, (state, action) => {
        const { prev, next, personajes } = action.payload;
        state.prev = prev;
        state.next = next;
        state.personajes = personajes;
      })
      .addCase(fetchFilterPersonajes.rejected, (state) => {
        state.prev = null;
        state.next = null;
        state.personajes = [];
      });
  },
});

export { fetchNextPersonajes, fetchPrevPersonajes, fetchPersonajes, fetchFilterPersonajes };
export const { setFiltro, resetFiltro } = personajesSlice.actions;
export default personajesSlice.reducer;
