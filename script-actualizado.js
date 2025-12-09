// Configuración de la API
const API_URL = 'http://localhost:3000/usuarios';

// Estado de la aplicación
let usuarioEnEdicion = null;
let usuarioParaEliminar = null;

// Elementos del DOM
const formulario = document.getElementById('formulario');
const inputNombre = document.getElementById('nombre');
const inputEmail = document.getElementById('email');
const inputEdad = document.getElementById('edad');
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar = document.getElementById('btnCancelar');
const btnRefrescar = document.getElementById('btnRefrescar');
const cuerpoTabla = document.getElementById('cuerpoTabla');
const tablaUsuarios = document.getElementById('tablaUsuarios');
const totalUsuarios = document.getElementById('totalUsuarios');
const mensaje = document.getElementById('mensaje');
const cargando = document.getElementById('cargando');
const modalConfirm = document.getElementById('modalConfirm');
const btnConfirmarEliminar = document.getElementById('btnConfirmarEliminar');
const btnCancelarEliminar = document.getElementById('btnCancelarEliminar');
const mensajeConfirm = document.getElementById('mensajeConfirm');

// Event Listeners
formulario.addEventListener('submit', manejarGuardar);
btnCancelar.addEventListener('click', cancelarEdicion);
btnRefrescar.addEventListener('click', cargarUsuarios);
btnConfirmarEliminar.addEventListener('click', confirmarEliminar);
btnCancelarEliminar.addEventListener('click', cerrarModal);

// Cargar usuarios al iniciar
window.addEventListener('DOMContentLoaded', cargarUsuarios);

/**
 * Validar nombre
 */
function validarNombre(nombre) {
  if (!nombre || nombre.trim().length < 3) {
    return 'El nombre debe tener al menos 3 caracteres';
  }
  if (nombre.trim().length > 100) {
    return 'El nombre no puede exceder 100 caracteres';
  }
  return null;
}

/**
 * Validar email
 */
function validarEmailFormato(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return 'El email no tiene un formato válido';
  }
  return null;
}

/**
 * Validar edad (MAYOR O IGUAL A 18)
 */
function validarEdadFormato(edad) {
  const edadNum = parseInt(edad);
  if (isNaN(edadNum)) {
    return 'La edad debe ser un número';
  }
  if (edadNum < 18) {
    return 'La edad debe ser mayor o igual a 18 años';
  }
  if (edadNum > 120) {
    return 'La edad no puede ser mayor a 120 años';
  }
  return null;
}

/**
 * Validar todos los campos del formulario
 */
function validarFormulario(nombre, email, edad) {
  const errorNombre = validarNombre(nombre);
  if (errorNombre) return errorNombre;

  const erroremail = validarEmailFormato(email);
  if (erroremail) return erroremail;

  const errorEdad = validarEdadFormato(edad);
  if (errorEdad) return errorEdad;

  return null;
}

/**
 * Cargar todos los usuarios desde la API
 */
async function cargarUsuarios() {
  try {
    mostrarCargando(true);
    const respuesta = await fetch(API_URL);
    
    if (!respuesta.ok) {
      throw new Error('Error al cargar usuarios');
    }
    
    const datos = await respuesta.json();
    
    if (datos.exito) {
      actualizarTabla(datos.datos);
      totalUsuarios.textContent = datos.cantidad;
    } else {
      mostrarMensaje('Error: ' + datos.mensaje, 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    mostrarMensaje('Error al conectar con la API: ' + error.message, 'error');
  } finally {
    mostrarCargando(false);
  }
}

/**
 * Actualizar la tabla con los usuarios
 */
function actualizarTabla(usuarios) {
  if (usuarios.length === 0) {
    cuerpoTabla.innerHTML = '<tr class="sin-datos"><td colspan="6">📭 No hay usuarios. Crea uno para empezar.</td></tr>';
    return;
  }

  cuerpoTabla.innerHTML = usuarios.map(usuario => `
    <tr>
      <td><strong>${usuario.id}</strong></td>
      <td>${usuario.nombre}</td>
      <td>${usuario.email}</td>
      <td>${usuario.edad}</td>
      <td>${new Date(usuario.fechaCreacion).toLocaleDateString('es-ES')}</td>
      <td>
        <div class="acciones">
          <button class="btn btn-small btn-edit" onclick="editarUsuario(${usuario.id})">✏️ Editar</button>
          <button class="btn btn-small btn-delete" onclick="abrirConfirmacion(${usuario.id}, '${usuario.nombre}')">🗑️ Eliminar</button>
        </div>
      </td>
    </tr>
  `).join('');
}

/**
 * Manejar envío del formulario
 */
async function manejarGuardar(e) {
  e.preventDefault();

  const nombre = inputNombre.value.trim();
  const email = inputEmail.value.trim();
  const edad = inputEdad.value;

  // Validar en el frontend
  const errorValidacion = validarFormulario(nombre, email, edad);
  if (errorValidacion) {
    mostrarMensaje(errorValidacion, 'error');
    return;
  }

  try {
    let respuesta;

    if (usuarioEnEdicion) {
      // Actualizar usuario existente
      respuesta = await fetch(`${API_URL}/${usuarioEnEdicion}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, email, edad: parseInt(edad) })
      });
    } else {
      // Crear nuevo usuario
      respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, email, edad: parseInt(edad) })
      });
    }

    if (!respuesta.ok) {
      throw new Error('Error en la operación');
    }

    const datos = await respuesta.json();

    if (datos.exito) {
      const mensaje = usuarioEnEdicion 
        ? 'Usuario actualizado correctamente' 
        : 'Usuario creado correctamente';
      mostrarMensaje(mensaje, 'exito');
      
      formulario.reset();
      cancelarEdicion();
      cargarUsuarios();
    } else {
      mostrarMensaje('Error: ' + datos.mensaje, 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    mostrarMensaje('Error al guardar usuario: ' + error.message, 'error');
  }
}

/**
 * Cargar usuario en el formulario para editar
 */
async function editarUsuario(id) {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`);
    
    if (!respuesta.ok) {
      throw new Error('Error al obtener usuario');
    }

    const datos = await respuesta.json();

    if (datos.exito) {
      const usuario = datos.datos;
      inputNombre.value = usuario.nombre;
      inputEmail.value = usuario.email;
      inputEdad.value = usuario.edad;

      usuarioEnEdicion = id;
      btnGuardar.textContent = '✏️ Actualizar Usuario';
      btnGuardar.style.background = '#f39c12';
      btnCancelar.style.display = 'inline-block';

      // Scroll al formulario
      formulario.scrollIntoView({ behavior: 'smooth' });
    } else {
      mostrarMensaje('Error: ' + datos.mensaje, 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    mostrarMensaje('Error al cargar usuario: ' + error.message, 'error');
  }
}

/**
 * Abrir modal de confirmación para eliminar
 */
function abrirConfirmacion(id, nombre) {
  usuarioParaEliminar = id;
  mensajeConfirm.textContent = `¿Estás seguro que deseas eliminar a ${nombre}? Esta acción no se puede deshacer.`;
  modalConfirm.style.display = 'flex';
}

/**
 * Cerrar modal de confirmación
 */
function cerrarModal() {
  modalConfirm.style.display = 'none';
  usuarioParaEliminar = null;
}

/**
 * Confirmar y eliminar usuario
 */
async function confirmarEliminar() {
  if (!usuarioParaEliminar) return;

  try {
    const respuesta = await fetch(`${API_URL}/${usuarioParaEliminar}`, {
      method: 'DELETE'
    });

    if (!respuesta.ok) {
      throw new Error('Error al eliminar usuario');
    }

    const datos = await respuesta.json();

    if (datos.exito) {
      mostrarMensaje('Usuario eliminado correctamente', 'exito');
      cerrarModal();
      cargarUsuarios();
    } else {
      mostrarMensaje('Error: ' + datos.mensaje, 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    mostrarMensaje('Error al eliminar usuario: ' + error.message, 'error');
  }
}

/**
 * Cancelar edición
 */
function cancelarEdicion() {
  usuarioEnEdicion = null;
  formulario.reset();
  btnGuardar.textContent = '💾 Guardar Usuario';
  btnGuardar.style.background = '';
  btnCancelar.style.display = 'none';
}

/**
 * Mostrar/ocultar mensaje
 */
function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = `mensaje ${tipo}`;
  mensaje.style.display = 'block';

  // Auto ocultar después de 5 segundos
  setTimeout(() => {
    mensaje.style.display = 'none';
  }, 5000);
}

/**
 * Mostrar/ocultar indicador de carga
 */
function mostrarCargando(mostrar) {
  cargando.style.display = mostrar ? 'block' : 'none';
  tablaUsuarios.style.display = mostrar ? 'none' : 'table';
}

/**
 * Cerrar modal al hacer clic fuera
 */
window.addEventListener('click', (e) => {
  if (e.target === modalConfirm) {
    cerrarModal();
  }
});

// Log de inicialización
console.log('✅ Frontend cargado correctamente');
console.log(`🔗 Conectando a API en: ${API_URL}`);
