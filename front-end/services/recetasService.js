const recetasService = {
  getAll: () => Http.request("/api/recetas"),

  getById: (id) => Http.request(`/api/recetas/${id}`),

  buscar: (query) =>
    Http.request(`/api/recetas/buscar?${new URLSearchParams(query)}`),

  recomendar: () => Http.request(`/api/recetas/recomendadas`),

  create: (token, data) =>
    Http.request(`/api/recetas`, { method: "POST", token, body: data }),

  update: (token, id, data) =>
    Http.request(`/api/recetas/${id}`, { method: "PUT", token, body: data }),

  delete: (token, id) =>
    Http.request(`/api/recetas/${id}`, { method: "DELETE", token }),

  derivar: (token, id, data) =>
    Http.request(`/api/recetas/derivar/${id}`, { method: "POST", token, body: data }),

  validar: (token, id) =>
    Http.request(`/api/recetas/validar/${id}`, { method: "PUT", token }),

  calificar: (token, id, valor) =>
    Http.request(`/api/recetas/calificar/${id}`, { method: "POST", token, body: { valor } }),

  comentar: (token, id, comentario) =>
    Http.request(`/api/recetas/comentar/${id}`, { method: "POST", token, body: { comentario } })
};

window.recetasService = recetasService