import './boton-favorito.css';

interface BotonFavoritoProps {
    esFavorito: boolean;
    onClick: () => void;
}

const BotonFavorito = ({esFavorito, onClick}: BotonFavoritoProps) => {
    const src = esFavorito ? "/imagenes/star-filled.png" : "/imagenes/star.png"

    return <div onClick={onClick} className="boton-favorito">
        <img src={src} alt={"favorito"} />
    </div>
}

export default BotonFavorito;