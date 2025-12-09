# Frontend CRUD de Usuarios

Aplicación frontend moderna para gestionar usuarios con **interfaz responsiva**, **arquitectura modular** y **validaciones en cliente**.

## 🎯 Características Principales

✅ **Interfaz responsiva** - Mobile, tablet y desktop  
✅ **Arquitectura modular** - 4 módulos independientes  
✅ **Validaciones completas** - Nombre, email, edad >= 18  
✅ **Timeout en API** - Evita cuelgues de servidor  
✅ **Indicador de carga** - Feedback visual durante operaciones  
✅ **Modal de confirmación** - Antes de eliminar usuarios  
✅ **Vanilla JavaScript** - Sin dependencias de frameworks pesados  

## 🚀 Instalación Rápida

### Opción 1: Vanilla JavaScript (SIN servidor)

```bash
# Solo abre index.html en el navegador
1. Descarga/clona el repositorio
2. Abre index.html directamente en tu navegador
3. ¡Listo! No necesitas servidor

# Asegúrate de que el backend está corriendo en otra terminal:
cd ../api-backend
npm start
```

**URL del frontend:** `file:///C:/Users/DELL/OneDrive/Documentos/frontend-usuarios/index.html`

### Opción 2: Con Vite (Servidor de desarrollo)

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor
npm run dev

# 3. Abrir en navegador
# Vite mostrará: Local: http://localhost:5173

# Backend debe estar corriendo:
cd ../api-backend && npm start
```

## 📁 Estructura de Archivos

```
├── index.html                   # Markup HTML (punto de entrada)
├── style.css                    # Estilos responsivos
├── script-actualizado.js        # Script anterior (backup)
│
├── modules/                     # ⭐ Arquitectura Modular
│   ├── api.js                   # Llamadas HTTP a la API
│   ├── validaciones.js          # Funciones de validación
│   ├── ui.js                    # Gestión de la interfaz (DOM)
│   └── controlador.js           # Orquestador principal
│
└── src/                         # Componentes React (opcional)
    ├── components/
    ├── App.jsx
    └── main.jsx
```

## 🏗️ Arquitectura de Módulos

### Ventajas de los 4 Módulos:

| Módulo | Responsabilidad | Ventaja |
|--------|-----------------|---------|
| **api.js** | Comunicación con servidor | Cambiar URL en un lugar |
| **validaciones.js** | Validar datos | Reutilizable en backend |
| **ui.js** | Actualizar interfaz | Cambios visuales centralizados |
| **controlador.js** | Orquestar todo | Lógica de negocio clara |

## ✅ Validaciones

### Frontend (Antes de enviar):
- **Nombre**: Mínimo 3 caracteres, máximo 100
- **Email**: Formato válido (xxx@xxx.xxx)
- **Edad**: Mínimo 18 años

### Backend (Validación adicional):
- Duplicate email check
- Tipos de datos validados
- Respuestas de error detalladas

## 📊 Operaciones CRUD

### CREATE (Crear)
```
Formulario → Validar → POST /usuarios → Tabla actualizada
```

### READ (Leer)
```
Al cargar → GET /usuarios → Mostrar en tabla
```

### UPDATE (Actualizar)
```
Clic Editar → Precarga formulario → PUT /usuarios/:id → Tabla actualizada
```

### DELETE (Eliminar)
```
Clic Eliminar → Modal confirmación → DELETE /usuarios/:id → Tabla actualizada
```

## 🔧 Configuración de Conexión

Editar en `modules/api.js`:

```javascript
const API_URL = 'http://localhost:3000/usuarios';
const TIMEOUT = 5000; // 5 segundos

// Cambiar para producción:
// const API_URL = 'https://tu-api.com/usuarios';
```

## 📋 Campos del Formulario

| Campo | Tipo | Validación |
|-------|------|-----------|
| Nombre | Text | 3-100 caracteres |
| Email | Email | Formato válido |
| Edad | Number | >= 18 años |

## 🧪 Pruebas Rápidas

1. **Crear usuario válido**
   - Nombre: "Juan Pérez"
   - Email: "juan@example.com"
   - Edad: 25
   - ✅ Debe aparecer en la tabla

2. **Rechazar edad < 18**
   - Edad: 15
   - ✅ Muestra error rojo

3. **Rechazar email inválido**
   - Email: "no es email"
   - ✅ Muestra error

4. **Editar usuario**
   - Clic en "Editar"
   - Cambia edad a 26
   - Clic "Guardar"
   - ✅ Tabla actualizada

5. **Eliminar usuario**
   - Clic en "Eliminar"
   - Modal de confirmación aparece
   - Confirma
   - ✅ Usuario desaparece de tabla

## 🔄 Próximas Mejoras

- LocalStorage para caché local
- Búsqueda y filtrado en tiempo real
- Ordenar por columnas
- Paginación
- Dark mode
- Exportar a CSV
- Más idiomas

## 📞 Troubleshooting

| Problema | Solución |
|----------|----------|
| "Error conectando a la API" | ✅ Verifica que backend está corriendo |
| Validaciones no funcionan | ✅ Abre DevTools (F12) y revisa console |
| Tabla vacía al cargar | ✅ Revisa Network en DevTools |
| Mensajes no aparecen | ✅ Se auto-ocultan en 5 segundos |

## 🤝 Cómo Contribuir

```bash
# 1. Fork el repositorio
# 2. Crea rama de feature
git checkout -b feature/mi-mejora

# 3. Commit
git commit -m "Agrega mi mejora"

# 4. Push
git push origin feature/mi-mejora

# 5. Abre Pull Request en GitHub
```

## 📄 Licencia

MIT License - Ver LICENSE para detalles

## 👤 Autor

**Rodolfoba1** - [GitHub](https://github.com/Rodolfoba1)

---

**Stack:** JavaScript Vanilla • Vite • HTML5 • CSS3  
**Última actualización:** Diciembre 2025
