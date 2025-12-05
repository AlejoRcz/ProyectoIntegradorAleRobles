// Service adicional relacionado a recetasService para facilitar la lista y creación de comentarios.

const comentarioService = {
  listarPorReceta: async (id) => {
    const receta = await recetasService.getById(id);

    const comentarios = (receta?.comentarios || []).map(c => ({
      usuario: c.usuario?.username || "Usuario",
      texto: c.comentario || "(sin texto)",
      fecha: c.fecha || c.createdAt || new Date().toISOString()
    }));

    return comentarios;
  },

  crear: (token, id, texto) =>
    recetasService.comentar(token, id, texto)
};
window.comentarioService = comentarioService;
