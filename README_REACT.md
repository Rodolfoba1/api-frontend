# Frontend - Gestión de Usuarios (React + Vite)

Interfaz moderna construida con **React + Vite** para interactuar con la API CRUD de usuarios.

## 📋 Características

✅ Crear nuevos usuarios  
✅ Ver lista de usuarios  
✅ Editar usuarios existentes  
✅ Eliminar usuarios con confirmación modal  
✅ Validación de formulario  
✅ Interfaz responsiva  
✅ Mensajes de estado  
✅ Indicador de carga  
✅ Componentes reutilizables  

## 🚀 Requisitos previos

- Node.js 16+ instalado
- npm o yarn

## 📦 Instalación

1. Asegúrate que el backend esté ejecutándose en `http://localhost:3000`

```powershell
cd c:\Users\DELL\OneDrive\Documentos\api
npm start
```

2. Instala las dependencias del frontend

```powershell
cd c:\Users\DELL\OneDrive\Documentos\frontend-usuarios
npm install
```

## ▶️ Ejecución

Para iniciar el servidor de desarrollo:

```powershell
npm run dev
```

El proyecto se abrirá automáticamente en `http://localhost:5173/`

## 🔨 Comandos disponibles

```powershell
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar la build de producción
npm run preview

# Linter de código
npm run lint
```

## 📁 Estructura de carpetas

```
frontend-usuarios/
├── src/
│   ├── components/
│   │   ├── UserForm.jsx      # Formulario de creación/edición
│   │   ├── UserTable.jsx     # Tabla de usuarios
│   │   ├── Message.jsx       # Componente de mensajes
│   │   └── Statistics.jsx    # Estadísticas
│   ├── App.jsx               # Componente principal
│   ├── App.css               # Estilos de la aplicación
│   ├── index.css             # Estilos globales
│   ├── main.jsx              # Punto de entrada
│   └── ...
├── public/                   # Archivos estáticos
├── package.json              # Dependencias del proyecto
├── vite.config.js            # Configuración de Vite
└── README.md                 # Este archivo
```

## 🧩 Componentes principales

### `App.jsx`
Componente raíz que maneja:
- Estado global (usuarios, carga, mensajes, etc.)
- Lógica de CRUD
- Comunicación con la API

### `UserForm.jsx`
Formulario reutilizable para crear/editar usuarios

### `UserTable.jsx`
Tabla que muestra la lista de usuarios con acciones

### `Message.jsx`
Componente para mostrar notificaciones

### `Statistics.jsx`
Panel de estadísticas

## 🌐 API Integration

El proyecto se comunica con la API en `http://localhost:3000/api/usuarios`

**Endpoints usados:**
- `GET /api/usuarios` - Obtener todos los usuarios
- `POST /api/usuarios` - Crear usuario
- `PUT /api/usuarios/:id` - Actualizar usuario
- `DELETE /api/usuarios/:id` - Eliminar usuario

## 📱 Responsiva

La aplicación es completamente responsiva y funciona bien en:
- Ordenadores de escritorio
- Tablets
- Dispositivos móviles

## 🎨 Diseño

- Colores modernos con degradado
- Interfaz intuitiva y fácil de usar
- Animaciones suaves
- Feedback visual para todas las acciones
