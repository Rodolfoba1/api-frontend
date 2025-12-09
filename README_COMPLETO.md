# Frontend CRUD de Usuarios

Aplicación frontend moderna para gestionar usuarios con **interfaz responsiva**, **arquitectura modular** y **validaciones en cliente**.

## 🎯 Características Principales

✅ **Interfaz responsiva** - Mobile, tablet y desktop  
✅ **Arquitectura modular** - 4 módulos independientes  
✅ **Validaciones completas** - Nombre, email, edad >= 18  
✅ **Timeout en API** - Evita cuelgues de servidor  
✅ **Indicador de carga** - Feedback visual durante operaciones  
✅ **Modal de confirmación** - Antes de eliminar usuarios  
✅ **Mensajes auto-ocultables** - Notificaciones de éxito/error  
✅ **Vanilla JavaScript** - Sin dependencias de frameworks pesados  

## 🏗️ Estructura del Proyecto

```
frontend-usuarios/
├── index.html                   # Markup HTML principal
├── style.css                    # Estilos responsivos (400+ líneas)
├── script-actualizado.js        # Script original (backup)
├── modules/                     # Módulos reutilizables
│   ├── api.js                   # Comunicación con API
│   ├── validaciones.js          # Funciones de validación
│   ├── ui.js                    # Gestión del DOM
│   └── controlador.js           # Orquestador principal
├── public/
│   └── vite.svg                 # Assets
├── src/                         # Componentes React (opcional)
│   ├── components/
│   │   ├── UserForm.jsx
│   │   ├── UserTable.jsx
│   │   ├── Message.jsx
│   │   └── Statistics.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json                 # Dependencias (Vite)
├── vite.config.js               # Configuración Vite
├── .gitignore                   # Archivos excluidos
└── README.md                    # Este archivo
```

## 🚀 Instalación Rápida

### Opción 1: Vanilla JavaScript (Recomendado para empezar)

#### 1. Clonar el repositorio
```bash
git clone https://github.com/Rodolfoba1/api-frontend.git
cd api-frontend
```

#### 2. Abrir en navegador
Simplemente abre `index.html` en tu navegador (sin servidor necesario):
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

#### 3. Asegurar que el backend está corriendo
```bash
# En otra terminal, ve a la carpeta del backend
cd ../api-backend
npm start
```

El frontend se conectará a `http://localhost:3000/usuarios`

### Opción 2: Con Vite (Para desarrollo avanzado)

#### 1. Instalar dependencias
```bash
npm install
```

#### 2. Iniciar servidor de desarrollo
```bash
npm run dev
```

#### 3. Compilar para producción
```bash
npm run build
```

## 📦 Arquitectura de Módulos

### 1. **modules/api.js** - Comunicación con API
```javascript
// Todas las llamadas HTTP centralizadas
API.obtenerTodos()
API.obtenerPorId(id)
API.crearUsuario(datos)
API.actualizarUsuario(id, datos)
API.eliminarUsuario(id)
```

**Características:**
- Timeout de 5 segundos
- Manejo automático de errores
- Respuestas JSON normalizadas

### 2. **modules/validaciones.js** - Validaciones del Cliente
```javascript
VALIDACIONES.validarNombre(nombre)      // 3-100 caracteres
VALIDACIONES.validarEmail(email)        // Formato válido
VALIDACIONES.validarEdad(edad)          // >= 18 años
VALIDACIONES.validarFormulario(datos)   // Validación completa
```

**Ventajas:**
- Código reutilizable
- Fácil de testear
- Mensajes de error claros

### 3. **modules/ui.js** - Gestión de Interfaz
```javascript
UI.inicializar()              // Cargar elementos del DOM
UI.mostrarMensaje(msg, tipo)  // Mostrar notificación
UI.renderizarTabla(usuarios)  // Actualizar tabla
UI.mostrarCarga(true/false)   // Indicador de loading
UI.limpiarFormulario()        // Resetear inputs
UI.mostrarModalEliminar()     // Modal de confirmación
```

### 4. **modules/controlador.js** - Orquestador Principal
```javascript
// Coordina la interacción entre API, UI y Validaciones
controlador.inicializar()
controlador.cargarUsuarios()
controlador.manejarGuardar(e)
controlador.manejarEditar(id)
controlador.manejarEliminar(id)
```

## 🎨 Características de la UI

### Responsive Design
- **Mobile** (< 768px): Vista completa adaptada
- **Tablet** (768px - 1024px): Layout de 2 columnas
- **Desktop** (> 1024px): Interfaz completa

### Componentes Visuales
- **Header gradiente** con logo
- **Formulario intuitivo** con validación en tiempo real
- **Tabla ordenable** de usuarios
- **Indicador de carga** durante operaciones
- **Mensajes flotantes** auto-ocultables (5 segundos)
- **Modal de confirmación** para eliminaciones

### Colores y Temas
```css
--color-primary: #7c3aed (púrpura)
--color-success: #10b981 (verde)
--color-error: #ef4444 (rojo)
--color-warning: #f59e0b (naranja)
```

## 📝 Campos del Formulario

| Campo | Tipo | Validación | Requerido |
|-------|------|------------|-----------|
| Nombre | text | 3-100 caracteres | ✅ Sí |
| Email | email | Formato válido (xxx@xxx.xxx) | ✅ Sí |
| Edad | number | Mínimo 18 años | ✅ Sí |

## 🔄 Flujo de Operaciones

### Crear Usuario
```
1. Usuario llena formulario
2. Frontend valida datos
3. Si válido → Envía POST a API
4. Indicador de carga activo
5. Espera respuesta (máx 5 segundos)
6. Muestra éxito y recarga tabla
7. Limpia formulario
```

### Editar Usuario
```
1. Usuario hace clic en "Editar"
2. Frontend obtiene datos del usuario
3. Precarga formulario con valores
4. Usuario modifica campos
5. Valida nuevamente
6. Envía PUT con cambios
7. Actualiza tabla
```

### Eliminar Usuario
```
1. Usuario hace clic en "Eliminar"
2. Modal de confirmación aparece
3. Usuario confirma eliminación
4. Frontend envía DELETE
5. Recarga tabla sin ese usuario
6. Muestra mensaje de éxito
```

## 🧪 Pruebas Manuales

### Test 1: Validación de Edad
```
1. Intenta crear usuario con edad 15
2. Frontend rechaza antes de enviar
3. Muestra error: "Debes ser mayor de 18 años"
```

### Test 2: Email Inválido
```
1. Intenta crear usuario con email "invalido"
2. Frontend rechaza
3. Muestra error: "El formato del email no es válido"
```

### Test 3: Nombre Muy Corto
```
1. Intenta crear usuario con nombre "ab"
2. Frontend rechaza
3. Muestra error: "El nombre debe tener al menos 3 caracteres"
```

### Test 4: Timeout de API
```
1. Detén el servidor backend
2. Intenta crear usuario en frontend
3. Espera 5 segundos
4. Muestra error: "Timeout de la API"
```

## 📚 Integración con Backend

### Conexión
```javascript
// En modules/api.js
const API_URL = 'http://localhost:3000/usuarios';
const TIMEOUT = 5000; // 5 segundos
```

### Cambiar URL en Producción
```javascript
// Para producción, cambiar a:
const API_URL = 'https://tu-api.herokuapp.com/usuarios';
```

## 🔄 Próximas Mejoras

- [ ] **LocalStorage**: Caché de usuarios localmente
- [ ] **Modo Offline**: Funcionalidad sin internet
- [ ] **Búsqueda**: Filtrar usuarios en tiempo real
- [ ] **Sorting**: Ordenar por nombre, edad, fecha
- [ ] **Paginación**: Mostrar 10 usuarios por página
- [ ] **Importar/Exportar**: CSV, JSON
- [ ] **Temas**: Dark mode
- [ ] **Internacionalización**: Soporte multiidioma
- [ ] **Tests**: Jest + React Testing Library
- [ ] **Accesibilidad**: WCAG 2.1 AA compliance

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit cambios (`git commit -m 'Add mejora'`)
4. Push a rama (`git push origin feature/mejora`)
5. Abre Pull Request

## 📞 Soporte

Si encuentras problemas:
1. Verifica que el backend está corriendo (`npm start` en carpeta api)
2. Revisa la consola del navegador (F12)
3. Abre un Issue en GitHub

## 📄 Licencia

Proyecto bajo licencia MIT - ver LICENSE para detalles.

## 👤 Autor

**Rodolfoba1**
- GitHub: [@Rodolfoba1](https://github.com/Rodolfoba1)
- Email: awirodolfo@gmail.com

---

**Stack:** Vanilla JavaScript • Vite • HTML5 • CSS3  
**Patrón:** MVC con Módulos Independientes  
**Última actualización:** Diciembre 2025
