(function () {
  const root = document.getElementById("navbar-root");
  if (!root) return;

  function getUser() {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/pages/login.html";
  }

  const user = getUser();
  const isLogged = Boolean(localStorage.getItem("token"));
  const role = user?.role || "guest";

  const adminLinks = role === "admin"
    ? `<li><a class="dropdown-item" href="/pages/admin-dashboard.html">Panel Admin</a></li>`
    : "";

  const chefLinks = role === "chef"
    ? `<li><a class="dropdown-item" href="/pages/create-receta.html">Crear Receta</a></li>`
    : "";

  const userLinks = isLogged
    ? `
    <li class="nav-item"><a class="nav-link" href="/pages/create-receta.html">Crear receta</a></li>
    <li class="nav-item"><a class="nav-link" href="/pages/profile.html">Mi Perfil</a></li>
  `
    : "";

  const authButtons = isLogged
    ? `
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
        <i class="bi bi-person-circle me-1"></i> ${user.username}
      </a>
      <ul class="dropdown-menu dropdown-menu-end">
        ${chefLinks}
        <li><a class="dropdown-item" href="/pages/profile.html">Mi Perfil</a></li>
        <li><a class="dropdown-item" href="/pages/profile.html#favoritos">Favoritos</a></li>
        <li><a class="dropdown-item" href="#" id="logout-btn">Cerrar sesión</a></li>
        <li><hr class="dropdown-divider"></li>
        ${adminLinks}
      </ul>
    </li>
  `
    : `
    <li class="nav-item">
      <a class="btn btn-outline-primary me-2" href="/pages/login.html">Iniciar Sesión</a>
    </li>
    <li class="nav-item">
      <a class="btn btn-primary" href="/pages/register.html">Registrarse</a>
    </li>
  `;

  root.innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
    <div class="container">
      <a class="navbar-brand fw-bold" href="/index.html">
        <img src="/assets/logo.png" alt="" height="36" class="me-2">
        Robles Gastro Lab
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <li class="nav-item"><a class="nav-link" href="/pages/recetas-list.html">Recetas</a></li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
              Comunidad
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/pages/comunidad.html#popularidad">Ranking Popularidad</a></li>
              <li><a class="dropdown-item" href="/pages/comunidad.html#valoracion">Ranking Valoración</a></li>
              <li><a class="dropdown-item" href="/pages/comunidad.html#usuarios">Top Usuarios</a></li>
              <li><a class="dropdown-item" href="/pages/comunidad.html#cocineros">Top Cocineros</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="/pages/comunidad.html#eventos">Eventos</a></li>
              <li><a class="dropdown-item" href="/pages/comunidad.html#chat">Chat</a></li>
            </ul>
          </li>

          ${userLinks}
        </ul>

        <ul class="navbar-nav ms-auto">
          ${authButtons}
        </ul>
      </div>
    </div>
  </nav>
  `;

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);
})();