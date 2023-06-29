let favoritos: number[] = [];

 const getFavoritos = (): number[] => favoritos;

 const addFavorito = (favorito: number): number[] => {
  if (favoritos.includes(favorito)) {
    return favoritos;
  }

  favoritos = [...favoritos, favorito];
  return favoritos;
};

 const removeFavorito = (favorito: number): number[] => {
  favoritos = favoritos.filter((fav) => fav !== favorito);
  return favoritos;
};

const toggleFavorito = (favorito: number): number[] => {
  if (favoritos.includes(favorito)) {
    return removeFavorito(favorito);
  }

  return addFavorito(favorito);
};

 const eliminarFavoritos = (): number[] => {
  favoritos = [];
  return favoritos;
};

export {eliminarFavoritos,toggleFavorito,removeFavorito,addFavorito,getFavoritos}
