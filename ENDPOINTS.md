# 🚀 Pruebas de API (Thunder Client)

Esta sección permite verificar manualmente todas las funcionalidades del backend 
de froma interna sin hacer uso del frontend. Esto se hace usando Thunder Client y valida si el servidor y todas las rutas, modelos y controles funcionan de forma adecuada.
Cada prueba incluye: método, endpoint, headers y el JSON necesario.

---

# 1. Autenticación

## 🔹 Registro de usuario
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
- Obtener tu perfil
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

*Listar recetas*
**GET** `/api/recetas`

*Obtener receta por ID*
**GET** `/api/recetas/:id`

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