/******************************
 *  Robles Gastro Lab — main.js
 *  Archivo principal del index
 *****************************/

import recetasService from "/services/recetasService.js";

/* ================================
   CARGAR RECOMENDADAS
================================ */
const loadRecommended = async () => {
  const container = document.getElementById("recommended-list");
  if (!container) return;

  container.innerHTML = `
    <div class="col-12 text-center py-4 text-muted">
      Cargando recomendaciones…
    </div>
  `;

  try {
    const recetas = await recetasService.recomendar(); 
    // backend devuelve: [ {...}, {...} ]

    container.innerHTML = "";

    if (!recetas.length) {
      container.innerHTML = `
        <div class="col-12 text-center py-4 text-muted">
          No hay recomendaciones disponibles.
        </div>
      `;
      return;
    }

    recetas.forEach(rec => {
      const img = rec.imagenes?.[0] || "/assets/default.jpg";
      const autor = rec.autor?.username || "Usuario";

      container.innerHTML += `
        <div class="col-12 col-md-4">
          <div class="card h-100 shadow-sm recipe-card clickable"
               onclick="window.location.href='/pages/receta.html?id=${rec._id}'">

            <img src="${img}" class="card-img-top" alt="${rec.titulo}" style="object-fit: cover; height: 180px;">

            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${rec.titulo}</h5>
              <p class="small text-muted mb-2">Por ${autor}</p>

              <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="badge bg-warning text-dark">
                  ⭐ ${rec.promedio?.toFixed(1) ?? "—"}
                </span>

                <a class="btn btn-primary btn-sm" href="/pages/receta.html?id=${rec._id}">
                  Ver más
                </a>
              </div>
            </div>

          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error al cargar recomendadas:", error);
    container.innerHTML = `
      <div class="col-12 text-danger text-center py-4">
        Error al cargar recomendaciones. Intenta más tarde.
      </div>
    `;
  }
};


/* ================================
   BUSCADOR RÁPIDO DEL INDEX
================================ */
const setupQuickSearch = () => {
  const form = document.getElementById("quick-search");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const q = document.getElementById("q").value.trim();
    const tipo = document.getElementById("tipo").value;
    const dificultad = document.getElementById("dificultad").value;

    const query = new URLSearchParams();

    if (q) query.append("q", q);
    if (tipo) query.append("tipo", tipo);
    if (dificultad) query.append("dificultad", dificultad);

    window.location.href = `/pages/recetas-list.html?${query.toString()}`;
  });
};


/* ================================
   INICIALIZAR INDEX
================================ */
document.addEventListener("DOMContentLoaded", () => {
  loadRecommended();
  setupQuickSearch();
});