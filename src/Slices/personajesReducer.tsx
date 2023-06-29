import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ObtenerPersonajes, ObtenerPersonajesFiltrados, obtenerPersonajesPag } from '../api/ApiPersonajes'
import { RootState } from '../store/store';

interface Personaje {
    id: number;
    nombre?: string;
    url?: string;
    imagen?: string;
    planeta?: string;
    genero?: string;
    episodios?: string[];
  }
  
  interface PersonajesState {
    next: string | null;
    prev: string | null;
    personajes: Personaje[];
    filtro: string;
  }
  
  const initialState: PersonajesState = {
    next: null,
    prev: null,
    personajes: [],
    filtro: '',
  };
  
  const fetchFilterPersonajes = createAsyncThunk(
    'personajes/fetchFilterPersonajes',
    async (filter: string) => {
      const response = await ObtenerPersonajesFiltrados(filter);
      return response;
    }
  );
  
  const fetchPersonajes = createAsyncThunk(
    'personajes/fetchPersonajes',
    async () => {
      const response = await ObtenerPersonajes();
      return response;
    }
  );
  
   const fetchPrevPersonajes = createAsyncThunk(
    'personajes/fetchPrevPersonajes',
    async (_, { getState, rejectWithValue }) => {
      const state = getState() as RootState;
      const { prev } = state.personajes;
  
      if (!prev) {
        return rejectWithValue("Lo sentimos no hay mas personajes");
      }
  
      const response = await obtenerPersonajesPag(prev);
      return response;
    }
  );
  
   const fetchNextPersonajes = createAsyncThunk(
    'personajes/fetchNextPersonajes',
    async (_, { getState, rejectWithValue }) => {
      const state = getState() as RootState;
      const { next } = state.personajes;
  
      if (!next) {
        return rejectWithValue("Lo sentimos no hay mas personajes");
      }
  
      const response = await obtenerPersonajesPag(next);
      return response;
    }
  );
  
  const personajesSlice = createSlice({
    name: 'personajes',
    initialState,
    reducers: {
      setFiltro(state, action: PayloadAction<string>) {
        state.filtro = action.payload;
      },
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
  
  export {fetchNextPersonajes,fetchPrevPersonajes,fetchPersonajes, fetchFilterPersonajes};
  export const { setFiltro, resetFiltro } = personajesSlice.actions;
  export default personajesSlice.reducer;
  
  
  