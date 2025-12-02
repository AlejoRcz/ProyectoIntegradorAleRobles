const usuarioService = {
  getFavorites: (token) =>
    Http.request("/api/usuarios/favorites", { token }),

  addFavorite: (token, id) =>
    Http.request(`/api/usuarios/favorites/add/${id}`, { method: "POST", token }),

  removeFavorite: (token, id) =>
    Http.request(`/api/usuarios/favorites/remove/${id}`, { method: "POST", token }),

  follow: (token, id) =>
    Http.request(`/api/usuarios/follow/${id}`, { method: "POST", token }),

  unfollow: (token, id) =>
    Http.request(`/api/usuarios/unfollow/${id}`, { method: "POST", token }),

  updateProfile: (token, data) =>
    Http.request(`/api/usuarios/update`, { method: "PUT", token, body: data }),

  getById: (token, id) =>
    Http.request(`/api/usuarios/${id}`, { token })
};

window.usuarioService = usuarioService;