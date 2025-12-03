/******************************
 *  Robles Gastro Lab — main.js
 *****************************/

document.addEventListener("DOMContentLoaded", () => {
  loadRecommended();
  setupQuickSearch();
});

async function loadRecommended() {
  const container = document.getElementById("recommended-list");
  if (!container) return;

  container.innerHTML = `
    <div class="col-12 text-center py-4 text-muted">
      Cargando recomendaciones…
    </div>
  `;

  try {
    const recetas = await window.recetasService.recomendar();

    if (!recetas || recetas.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-4 text-muted">
          No hay recomendaciones todavía.
        </div>
      `;
      return;
    }

    container.innerHTML = recetas.map(r => {
      const img = r.imagenes?.[0] || "/assets/placeholder.png";
      const promedio = (typeof r.promedio === "number")
        ? r.promedio.toFixed(1)
        : "—";

      return `
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm">
            <img src="${img}" class="card-img-top" style="object-fit:cover;height:180px;">
            <div class="card-body d-flex flex-column">
              <h5>${r.titulo}</h5>
              <p class="small text-muted text-truncate">${r.descripcion || ""}</p>

              <div class="mt-auto d-flex justify-content-between align-items-center">
                <a href="/pages/receta-view.html?id=${r._id}" class="btn btn-sm btn-primary">Ver</a>
                <span class="text-warning"><i class="bi bi-star-fill"></i> ${promedio}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

  } catch (err) {
    console.error(err);
    container.innerHTML = `
      <div class="col-12 text-danger text-center py-4">
        Error al cargar recetas.
      </div>
    `;
  }
}

function setupQuickSearch() {
  const form = document.getElementById("quick-search");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const fd = new FormData(form);
    const params = new URLSearchParams(fd.entries());
    window.location.href = `/pages/recetas-list.html?${params.toString()}`;
  });
}