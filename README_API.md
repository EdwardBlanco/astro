# Documentación de la API de Numerología

Esta es la documentación oficial para consumir los servicios del backend. 

## Configuración Base

- **Base URL Local**: `http://localhost:3000`
- **Base URL Pública**: `(Tu URL de Dev Tunnels aquí)`
- **Autenticación**: Los endpoints protegidos requieren un token JWT.
- **Formato del Token**: Enviar el token en la pestaña **Headers** bajo la clave `x-token`. (NO usar la pestaña Auth/Bearer Token).
- **Formato del Cuerpo**: Todos los endpoints POST usan `application/json`.

---

## 1. Autenticación (Auth)

### Registro de Usuario
- **Método**: `POST`
- **Ruta**: `/api/v1/auth/register`
- **Headers**: Ninguno
- **Body**:
  ```json
  {
    "nombre_completo": "Tu Nombre",
    "email": "correo@ejemplo.com",
    "password_hash": "tu_contraseña",
    "fecha_nacimiento": "YYYY-MM-DD"
  }
  ```

### Inicio de Sesión
- **Método**: `POST`
- **Ruta**: `/api/v1/auth/login`
- **Headers**: Ninguno
- **Body**:
  ```json
  {
    "email": "correo@ejemplo.com",
    "password_hash": "tu_contraseña"
  }
  ```
- **Nota**: Guarda el token devuelto para usarlo en los siguientes endpoints.

---

## 2. Numerología

### Obtener Perfil
- **Método**: `GET`
- **Ruta**: `/api/v1/numerology/profile`
- **Headers**: `x-token: <TU_TOKEN>`

### Calcular Numerología
- **Método**: `POST`
- **Ruta**: `/api/v1/numerology/calculate`
- **Headers**: `x-token: <TU_TOKEN>`
- **Body**:
  ```json
  {
    "numero_vida": 5,
    "numero_expresion": 3,
    "numero_alma": 7
  }
  ```

---

## 3. Lecturas

### Generar Lectura
- **Método**: `POST`
- **Ruta**: `/api/v1/readings/generate`
- **Headers**: `x-token: <TU_TOKEN>`
- **Body**:
  ```json
  {
    "prompt_enviado": "Quiero mi lectura de hoy",
    "respuesta_generada": "Hoy tendrás un gran día.",
    "tipo_lectura": "diaria"
  }
  ```
- **Nota**: `tipo_lectura` solo acepta "diaria", "general" o "anual".

### Historial de Lecturas
- **Método**: `GET`
- **Ruta**: `/api/v1/readings/history`
- **Headers**: `x-token: <TU_TOKEN>`

---

## 4. Compatibilidad

### Verificar Compatibilidad
- **Método**: `POST`
- **Ruta**: `/api/v1/compatibility/check`
- **Headers**: `x-token: <TU_TOKEN>`
- **Body**:
  ```json
  {
    "user_id_2": "60d5ecb8b392d7001538309a",
    "puntaje": 85,
    "interpretacion_ia": "Alta compatibilidad."
  }
  ```
- **Nota**: `user_id_2` debe ser un ObjectId válido de MongoDB.
