import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { obtEpisodios } from "../api/ApiPersonajes";

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
 * Interfaz que representa el estado del detalle del personaje.
 * @interface
 * @property {Personaje} personaje - El personaje.
 * @property {Episodio[]} episodios - Los episodios del personaje.
 */
interface DetalleState {
  personaje: Personaje;
  episodios: Episodio[];
}

/**
 * Interfaz que representa un episodio.
 * @interface
 * @property {number} id - El ID del episodio.
 * @property {string} titulo - El título del episodio.
 * @property {string} fecha - La fecha de lanzamiento del episodio.
 * @property {string} episodio - El número del episodio.
 */
interface Episodio {
  id: number;
  titulo: string;
  fecha: string;
  episodio: string;
}

/**
 * Estado inicial del detalle del personaje.
 */
const initialState: DetalleState = {
  personaje: {
    id: -1,
    episodios: [],
  },
  episodios: [],
};

/**
 * Función asíncrona que obtiene los episodios del personaje.
 * @type {AsyncThunk<Episodio[], void, { state: RootState }>}
 */
const Episodios = createAsyncThunk('detalle/fetchEpisodios', async (arg, thunkAPI) => {
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
  const response = await obtEpisodios(arrayEpisodios);
  return response;
});

/**
 * Slice del detalle del personaje.
 */
const detalleSlice = createSlice({
  name: 'detalle',
  initialState,
  reducers: {
    /**
     * Acción para establecer el detalle del personaje.
     * @param {DetalleState} state - El estado del detalle del personaje.
     * @param {PayloadAction<Personaje>} action - La acción con el personaje.
     */
    setDetalle: (state, action: PayloadAction<Personaje>) => {
      state.personaje = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Episodios.fulfilled, (state, action) => {
      state.episodios = action.payload;
    });
  },
});

export { Episodios };
export const { setDetalle } = detalleSlice.actions;
export default detalleSlice.reducer;
