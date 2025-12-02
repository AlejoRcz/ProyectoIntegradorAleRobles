# Todas las funciones / endpoints del sistema para probar

Esta sección permite verificar manualmente todas las funcionalidades del backend 
de froma interna sin hacer uso del frontend. Esto se hace usando Thunder Client y valida si el servidor y todas las rutas, modelos y controles funcionan de forma adecuada.
Cada prueba incluye: método, endpoint, headers y el JSON necesario.

---

# 1. Autenticación

## Registro de usuario
**POST** `/api/auth/register`

### Headers
Content-Type: application/json

### Body

{
  "username": "usuario1",
  "email": "usuario1@test.com",
  "password": "1234",
  "name": "Usuario Uno",
  "role": "chef"
}

---

# 2. Inicio de sesión
**POST** `/api/auth/login`
### Headers
Content-Type: application/json
### Body

{
  "identifier": "usuario1",
  "password": "1234"
}
### Respuesta esperada

{
  "message": "Inicio de sesión exitoso",
  "token": "AAA.BBB.CCC",
  "user": {
    "id": "xxxx",
    "username": "usuario1",
    "role": "chef"
  }
}

- Guarda el token JWT.
- Usarlo como Bearer Token en los siguientes endpoints.

# 3. Usuarios (requiere autenticación)

*Obtener tu perfil*
**GET** `/api/usuarios/me`
### Headers
Authorization: Bearer TU_TOKEN

*Ver perfil de otro usuario*
**GET** `/api/usuarios/:id`

*Actualizar perfil*
**PUT** `/api/usuarios/update`
### Headers
Content-Type: application/json
Authorization: Bearer TU_TOKEN
### Body
{
  "username": "nuevoUsuario",
  "profileImage": "https://imagen.com/foto.png",
  "country": "Costa Rica",
  "bio": "Me encanta la cocina",
  "interests": "postres, carnes"
}

*Seguir usuario*
**POST** `/api/usuarios/follow/:id`
### Headers
Authorization: Bearer TU_TOKEN

*Dejar de seguir usuario*
**POST** `/api/usuarios/unfollow/:id`
### Headers
Authorization: Bearer TU_TOKEN

*Añadir receta a favoritos*
**POST** `/api/usuarios/favorites/add/:id`
### Headers
Authorization: Bearer TU_TOKEN
Content-Type: application/json

*Remover receta de favoritos*
**POST** `/api/usuarios/favorites/remove/:id`
### Headers
Authorization: Bearer TU_TOKEN
Content-Type: application/json

*Obtener mis favoritos*
**GET** `/api/usuarios/favorites`
### Headers
Authorization: Bearer TU_TOKEN

# 4. Recetas

*Crear receta*
**POST** `/api/recetas`
### Headers
Content-Type: application/json
Authorization: Bearer TU_TOKEN
### Body
{
  "titulo": "Arroz con Pollo",
  "descripcion": "Receta típica",
  "ingredientes": [
    { "nombre": "Arroz", "cantidad": "2 tazas", "costo": 500 },
    { "nombre": "Pollo", "cantidad": "300g", "costo": 1100 }
  ],
  "pasos": [
    { "paso": "Cocinar el arroz" },
    { "paso": "Freír el pollo" }
  ],
  "tipo": "almuerzo",
  "dificultad": "Fácil",
  "ocasion": "familiar",
  "origen": "Costa Rica",
  "duracion": 45,
  "presupuestoPorPorcion": 1500,
  "imagenes": []
}

*Receta derivada*
**POST** `/api/recetas`
### Headers
Content-Type: application/json
Authorization: Bearer TU_TOKEN
### Body
{
  "titulo": "Arroz con Pollo",
  "descripcion": "Receta típica",
  "ingredientes": [
    { "nombre": "Arroz", "cantidad": "2 tazas", "costo": 500 },
    { "nombre": "Pollo", "cantidad": "300g", "costo": 1100 }
  ],
  "pasos": [
    { "paso": "Cocinar el arroz" },
    { "paso": "Freír el pollo" }
  ],
  "tipo": "almuerzo",
  "dificultad": "Fácil",
  "ocasion": "familiar",
  "origen": "Costa Rica",
  "duracion": 45,
  "presupuestoPorPorcion": 1500,
  "imagenes": []
  ### "derivadaDe": "ID_DE_RECETA_BASE"
}

*Listar recetas*
**GET** `/api/recetas`

*Obtener receta por ID*
**GET** `/api/recetas/:id`

*Obtener receta derivada*
**GET** `/api/recetas/:id(DERIVADA)`

*Editar receta*
**PUT** `/api/recetas/:id`
### Headers
Content-Type: application/json
Authorization: Bearer TU_TOKEN
### Body 
{
  {
  "titulo": "Arroz con Pollo",
  "descripcion": "Receta típica",
  "ingredientes": [
    { "nombre": "Arroz", "cantidad": "2 tazas", "costo": 500 },
    { "nombre": "Pollo", "cantidad": "300g", "costo": 1100 }
  ],
  "pasos": [
    { "paso": "Cocinar el arroz" },
    { "paso": "Freír el pollo" }
  ],
  "tipo": "almuerzo",
  "dificultad": "Fácil",
  "ocasion": "familiar",
  "origen": "Costa Rica",
  "duracion": 45,
  "presupuestoPorPorcion": 1500,
  "imagenes": []
}
}

**(Se cambia lo necesario a actualizar.)**

*Eliminar receta*
**DELETE** `/api/recetas/:id`
### Headers
Authorization: Bearer TU_TOKEN

*Validar receta (solo chef/admin)*
**PUT** /api/recetas/validar/:id
### Headers
Authorization: Bearer TOKEN_CHEF_O_ADMIN

*Calificar receta*
**POST** `/api/recetas/calificar/:id`
### Headers
Authorization: Bearer TU_TOKEN
Content-Type: application/json
### Body
{
  "valor": 5
}

*Comentar receta*
**POST** `/api/recetas/comentar/:id`
### Body
{
  "comentario": "Muy buena receta!"
}

*Buscar recetas*
**GET** `/api/recetas/buscar?q=pollo`
**GET** `/api/recetas/buscar?tipo=almuerzo`
**GET** `/api/recetas/buscar?ingrediente=arroz`

*Recomendaciones*
**GET** `/api/recetas/recomendadas`

# 5. Comunidad

*Eventos activos*
**GET** `/api/comunidad/eventos`

*Ranking de recetas POPULARES*
**GET** `/api/comunidad/ranking/popularidad`
- (Ordenado por cantidad de calificaciones)

*Ranking por valoracion*
**GET** `/api/comunidad/ranking/valoracion`
- (Ordenado por promedio)

*Ranking de usuarios por seguidores*
**GET** `/api/comunidad/ranking/usuarios`

*Ranking mas recetas*
**GET** `/api/comunidad/ranking/cocineros`

*Foro de Mensajes*
**POST** `/api/chat`
### Body
{
  "texto": "Hola comunidad, estoy probando el chat!"
}

*Obtener Mensajes del Chat*
**GET** `/api/chat`

# 6. Administrador

*Crear Evento*
**POST** `/api/eventos`
### Header
Authorization: Bearer TU_TOKEN_ADMIN
Content-Type: application/json
### Body
{
  "titulo": "Festival de Postres",
  "descripcion": "Semana dedicada a postres latinoamericanos",
  "mes": 12,
  "ano": 2025,
  "activo": true
}

*Editar Evento*
**PUT** `/api/eventos/id:`
### Header
Authorization: Bearer TU_TOKEN_ADMIN
Content-Type: application/json
### Body
{
  "titulo": "Festival de Postres",
  "descripcion": "Semana dedicada a postres latinoamericanos",
  "mes": 12,
  "ano": 2025,
  "activo": true
}
- (cambios solo en los apartados necesarios)

*Activar/Desactivar evento*
**PATCH** `/api/eventos/id:/toggle`

*Eliminar Evento*
**DELETE** `/api/eventos/id:`

*Ver todos los eventos*
**GET** `/api/eventos`

*Ver Usuarios*
**GET** `/api/admin/usuarios`

*Cambiar Rol a Usuarios*
**PUT** `/api/admin/usuarios/role/id:`
### Body
{
  "role": "chef"
}

*Eliminar Usuario*
**DELETE** `/api/admin/usuarios/:id`

*Ver reportes*
**GET** `/api/admin/reportes`

*Resolver reportes*
**POST** `/api/admin/reportes/:id/resolver`
### body
{ "accion": "eliminar" }
{ "accion": "ignorar" }

*Ver metricas*
**GET** `/api/admin/metrics`

# 7. Reportes

*Crear Reporte (usuario)*
**POST** `/api/reportes/ID_DE_RECETA`
### body
{
  "descripcion": "La receta tiene pasos incompletos"
}