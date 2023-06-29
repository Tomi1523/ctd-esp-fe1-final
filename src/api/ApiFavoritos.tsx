/**
 * Array que contiene los favoritos.
 * @type {number[]}
 */
let favoritos: number[] = [];

/**
 * Obtiene la lista de favoritos.
 * @returns {number[]} - La lista de favoritos.
 */
const getFavoritos = (): number[] => favoritos;

/**
 * Agrega un favorito a la lista.
 * @param {number} favorito - El favorito a agregar.
 * @returns {number[]} - La lista de favoritos actualizada.
 */
const addFavorito = (favorito: number): number[] => {
  if (favoritos.includes(favorito)) {
    return favoritos;
  }

  favoritos = [...favoritos, favorito];
  return favoritos;
};

/**
 * Elimina un favorito de la lista.
 * @param {number} favorito - El favorito a eliminar.
 * @returns {number[]} - La lista de favoritos actualizada.
 */
const removeFavorito = (favorito: number): number[] => {
  favoritos = favoritos.filter((fav) => fav !== favorito);
  return favoritos;
};

/**
 * Agrega o elimina un favorito de la lista según su estado actual.
 * @param {number} favorito - El favorito a agregar o eliminar.
 * @returns {number[]} - La lista de favoritos actualizada.
 */
const toggleFavorito = (favorito: number): number[] => {
  if (favoritos.includes(favorito)) {
    return removeFavorito(favorito);
  }

  return addFavorito(favorito);
};

/**
 * Elimina todos los favoritos de la lista.
 * @returns {number[]} - La lista de favoritos vacía.
 */
const eliminarFavoritos = (): number[] => {
  favoritos = [];
  return favoritos;
};

export { eliminarFavoritos, toggleFavorito, removeFavorito, addFavorito, getFavoritos };
