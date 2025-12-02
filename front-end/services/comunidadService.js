const comunidadService = {
  rankingPopularidad: () => Http.request("/api/comunidad/ranking/popularidad"),
  rankingValoracion: () => Http.request("/api/comunidad/ranking/valoracion"),
  rankingUsuarios: () => Http.request("/api/comunidad/ranking/usuarios"),
  rankingCocineros: () => Http.request("/api/comunidad/ranking/cocineros")
};
window.comunidadService = comunidadService;