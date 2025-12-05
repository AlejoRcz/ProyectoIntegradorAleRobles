// Service adicional relacionado a recetasService para facilitar la lista y creación de comentarios.

const comentarioService = {
  listarPorReceta: async (id) => {
    const receta = await recetasService.getById(id);
    return receta?.comentarios || [];
  },

  crear: (token, id, texto) =>
    recetasService.comentar(token, id, texto)
};
window.comentarioService = comentarioService;
