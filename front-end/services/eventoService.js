const eventoService = {
  getActive: () => Http.request("/api/comunidad/eventos"),

  create: (token, data) =>
    Http.request("/api/eventos", { method: "POST", token, body: data }),

  update: (token, id, data) =>
    Http.request(`/api/eventos/${id}`, { method: "PUT", token, body: data }),

  toggle: (token, id) =>
    Http.request(`/api/eventos/${id}/toggle`, { method: "PATCH", token }),

  delete: (token, id) =>
    Http.request(`/api/eventos/${id}`, { method: "DELETE", token }),

  getAllAdmin: (token) =>
    Http.request(`/api/eventos`, { token })
};
window.eventoService = eventoService;