import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {  obtEpisodios } from "../api/ApiPersonajes";

interface Personaje {
    id: number;
    nombre?: string;
    url?: string;
    imagen?: string;
    planeta?: string;
    genero?: string;
    episodios?: Array<string>;
  }
  
  interface DetalleState {
    personaje: Personaje;
    episodios: Array<Episodio>;
  }
  
  interface Episodio {
    id: number;
    titulo: string;
    fecha: string;
    episodio: string;
  }
  
  const initialState: DetalleState = {
    personaje: {
      id: -1,
      episodios: [],
    },
    episodios: [],
  };
  
 const Episodios = createAsyncThunk('detalle/fetchEpisodios', 
    async (arg, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { personaje } = state.detalle;
    if (!personaje.episodios) {
      return [];
    }
    const arrayEpisodios = personaje.episodios.map((episodio: string) => {
      const array = episodio.split("/");
      const id = array[array.length - 1];
      return Number(id);
    });
    const response = obtEpisodios(arrayEpisodios);
    return response;
  });
  
  const detalleSlice = createSlice({
    name: 'detalle',
    initialState,
    reducers: {
      setDetalle: (state, action) => {
        state.personaje = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(Episodios.fulfilled, (state, action) => {
        state.episodios = action.payload;
      });
    },
  });

  export {Episodios}
  export const { setDetalle } = detalleSlice.actions;
  export default detalleSlice.reducer;
  