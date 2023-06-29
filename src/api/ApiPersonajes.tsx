/**
 * Interfaz que representa un personaje.
 * @interface
 * @property {number} id - El ID del personaje.
 * @property {string} nombre - El nombre del personaje.
 * @property {string} url - La URL del personaje.
 * @property {string} imagen - La URL de la imagen del personaje.
 * @property {string} planeta - El nombre del planeta del personaje.
 * @property {string[]} episodios - Los episodios en los que aparece el personaje.
 * @property {string} genero - El género del personaje.
 */
interface Personaje {
  id: number;
  nombre: string;
  url: string;
  imagen: string;
  planeta: string;
  episodios: string[];
  genero: string;
}

/**
 * Interfaz que representa el estado de los personajes.
 * @interface
 * @property {boolean} isLoading - Indica si los datos están cargando.
 * @property {string|null} next - La URL de la página siguiente.
 * @property {string|null} prev - La URL de la página anterior.
 * @property {Personaje[]} personajes - Los personajes obtenidos.
 */
interface PersonajesState {
  isLoading: boolean;
  next: string | null;
  prev: string | null;
  personajes: Personaje[];
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
 * Convierte los datos de un personaje en el formato deseado.
 * @param {any} personaje - Los datos del personaje.
 * @returns {Personaje} El personaje convertido.
 */
const mapPersonaje = (personaje: any): Personaje => ({
  id: personaje.id,
  nombre: personaje.name,
  url: personaje.url,
  imagen: personaje.image,
  planeta: personaje.location.name,
  episodios: personaje.episode,
  genero: personaje.gender,
});

/**
 * Convierte un array de datos de personajes en un array de personajes.
 * @param {any[]} Map - El array de datos de personajes.
 * @returns {Personaje[]} El array de personajes convertido.
 */
const mapPersonajes = (Map: any[]): Personaje[] =>
  Map.map(mapPersonaje);

/**
 * Obtiene todos los personajes.
 * @returns {Promise<PersonajesState>} Una promesa que resuelve con el estado de los personajes.
 */
const ObtenerPersonajes = async (): Promise<PersonajesState> => {
  const url = 'https://rickandmortyapi.com/api/character';
  return obtenerPersonajesPag(url);
};

/**
 * Realiza una petición HTTP y obtiene los datos.
 * @param {string} url - La URL de la petición.
 * @returns {Promise<any>} Una promesa que resuelve con los datos obtenidos.
 */
const fetchData = async (url: string): Promise<any> => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

/**
 * Obtiene los personajes de una página específica.
 * @param {string} url - La URL de la página de personajes.
 * @returns {Promise<PersonajesState>} Una promesa que resuelve con el estado de los personajes.
 */
const obtenerPersonajesPag = async (url: string): Promise<PersonajesState> => {
  const response = await fetchData(url);
  const { results, info } = response;
  const data: PersonajesState = {
    isLoading: false,
    next: info.next,
    prev: info.prev,
    personajes: mapPersonajes(results),
  };
  return data;
};

/**
 * Obtiene los personajes filtrados por nombre.
 * @param {string} filter - El filtro por nombre.
 * @returns {Promise<PersonajesState>} Una promesa que resuelve con el estado de los personajes filtrados.
 */
const ObtenerPersonajesFiltrados = async (
  filter: string
): Promise<PersonajesState> => {
  const url = `https://rickandmortyapi.com/api/character/?name=${filter}&page=1`;
  return obtenerPersonajesPag(url);
};

/**
 * Obtiene un array de personajes según los IDs proporcionados.
 * @param {number[]} array - Los IDs de los personajes.
 * @returns {Promise<Personaje[]>} Una promesa que resuelve con el array de personajes obtenidos.
 */
const personajesArray = async (
  array: number[]
): Promise<Personaje[]> => {
  if (array.length === 0) return [];

  const url = `https://rickandmortyapi.com/api/character/${array.join(',')}`;
  const response = await fetchData(url);
  const data: Personaje[] = Array.isArray(response)
    ? mapPersonajes(response)
    : mapPersonajes([response]);
  return data;
};

/**
 * Convierte los datos de un episodio en el formato deseado.
 * @param {any} episodio - Los datos del episodio.
 * @returns {Episodio} El episodio convertido.
 */
const mapEpisodio = (episodio: any): Episodio => ({
  id: episodio.id,
  titulo: episodio.name,
  fecha: episodio.air_date,
  episodio: episodio.episode,
});

/**
 * Convierte un array de datos de episodios en un array de episodios.
 * @param {any[]} episodiosToMap - El array de datos de episodios.
 * @returns {Episodio[]} El array de episodios convertido.
 */
const mapEpisodios = (episodiosToMap: any[]): Episodio[] =>
  episodiosToMap.map(mapEpisodio);

/**
 * Obtiene los episodios según los IDs proporcionados.
 * @param {number[]} array - Los IDs de los episodios.
 * @returns {Promise<Episodio[]>} Una promesa que resuelve con el array de episodios obtenidos.
 */
const obtEpisodios = async (
  array: number[]
): Promise<Episodio[]> => {
  if (array.length === 0) return [];

  const url = `https://rickandmortyapi.com/api/episode/${array.join(',')}`;
  const response = await fetchData(url);
  const data: Episodio[] = Array.isArray(response)
    ? mapEpisodios(response)
    : mapEpisodios([response]);
  return data;
};

export {
  obtEpisodios,
  personajesArray,
  ObtenerPersonajesFiltrados,
  ObtenerPersonajes,
  obtenerPersonajesPag
};
