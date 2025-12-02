const authService = {
  register: (data) =>
    Http.request("/api/auth/register", { method: "POST", body: data }),

  login: (identifier, password) =>
    Http.request("/api/auth/login", {
      method: "POST",
      body: { identifier, password }
    }),

  getMyProfile: (token) =>
    Http.request("/api/usuarios/me", { token })
};

window.authService = authService;