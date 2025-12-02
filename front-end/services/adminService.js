const adminService = {
  getMetrics: (token) =>
    Http.request(`/api/admin/metrics`, { token }),

  listUsers: (token) =>
    Http.request(`/api/admin/usuarios`, { token }),

  updateUserRole: (token, id, role) =>
    Http.request(`/api/admin/usuarios/role/${id}`, {
      method: "PUT",
      token,
      body: { role }
    }),

  deleteUser: (token, id) =>
    Http.request(`/api/admin/usuarios/${id}`, {
      method: "DELETE",
      token
    }),

  createCategoria: (token, nombre) =>
    Http.request(`/api/admin/categorias`, { method: "POST", token, body: { nombre } }),

  createEtiqueta: (token, nombre) =>
    Http.request(`/api/admin/etiquetas`, { method: "POST", token, body: { nombre } }),

  getReportes: (token) =>
    Http.request(`/api/admin/reportes`, { token }),

  resolverReporte: (token, id) =>
    Http.request(`/api/admin/reportes/${id}/resolver`, { method: "PUT", token }),

  crearReporte: (token, recetaId, descripcion) =>
    Http.request(`/api/reportes/${recetaId}`, { method: "POST", token, body: { descripcion } })
};

window.adminService = adminService;