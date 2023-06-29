interface Personaje {
    id: number;
    nombre: string;
    url: string;
    imagen: string;
    planeta: string;
    episodios: string[];
    genero: string;
  }
  
  interface PersonajesState {
    isLoading: boolean;
    next: string | null;
    prev: string | null;
    personajes: Personaje[];
  }
  
  interface Episodio {
    id: number;
    titulo: string;
    fecha: string;
    episodio: string;
  }
  
  const mapPersonaje = (personaje: any): Personaje => ({
    id: personaje.id,
    nombre: personaje.name,
    url: personaje.url,
    imagen: personaje.image,
    planeta: personaje.location.name,
    episodios: personaje.episode,
    genero: personaje.gender,
  });
  
  const mapPersonajes = (Map: any[]): Personaje[] =>
    Map.map(mapPersonaje);

     const ObtenerPersonajes = async (): Promise<PersonajesState> => {
        const url = 'https://rickandmortyapi.com/api/character?page=1';
        return obtenerPersonajesPag(url);
      };
  
  const fetchData = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  
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
  
  
  
   const ObtenerPersonajesFiltrados = async (
    filter: string
  ): Promise<PersonajesState> => {
    const url = `https://rickandmortyapi.com/api/character/?name=${filter}&page=1`;
    return obtenerPersonajesPag(url);
  };
  
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
  
  const mapEpisodio = (episodio: any): Episodio => ({
    id: episodio.id,
    titulo: episodio.name,
    fecha: episodio.air_date,
    episodio: episodio.episode,
  });
  
  const mapEpisodios = (episodiosToMap: any[]): Episodio[] =>
    episodiosToMap.map(mapEpisodio);
  
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

}

export {obtEpisodios,
    personajesArray,
    ObtenerPersonajesFiltrados,
    ObtenerPersonajes,
    obtenerPersonajesPag}