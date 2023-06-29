import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';

interface Personaje {
    id: number,
    nombre?: string,
    url?: string,
    imagen?: string,
    planeta?: string,
    genero?: string,
    episodios?: Array<string>,
}

interface GrillaPersonajesProps {
    personajes: Array<Personaje>;
}


const GrillaPersonajes = ({ personajes }: GrillaPersonajesProps) => {
    // Check if 'personajes' array is defined before mapping over it
    if (personajes) {
      return (
        <div className="grilla-personajes">
          {personajes.map((personaje, j) => (
            <div key={j}>
              <TarjetaPersonaje personaje={personaje} />
            </div>
          ))}
        </div>
      );
    }
  
    // Handle case when 'personajes' is undefined (optional)
    return <div>No personajes available</div>;
  };
  

export default GrillaPersonajes;