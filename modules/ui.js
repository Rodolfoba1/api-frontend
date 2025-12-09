/**
 * ui.js - Módulo de gestión de interfaz de usuario
 * Maneja interacciones con el DOM
 */

const UI = {
  // Elementos del DOM
  elementos: {
    formulario: null,
    nombre: null,
    email: null,
    edad: null,
    tabla: null,
    tbody: null,
    modal: null,
    btnConfirmar: null,
    btnCancelar: null,
    mensajeDiv: null,
    indicadorCarga: null
  },

  /**
   * Inicializar referencias del DOM
   */
  inicializar() {
    this.elementos.formulario = document.getElementById('formulario');
    this.elementos.nombre = document.getElementById('nombre');
    this.elementos.email = document.getElementById('email');
    this.elementos.edad = document.getElementById('edad');
    this.elementos.tabla = document.getElementById('tabla');
    this.elementos.tbody = document.querySelector('#tabla tbody');
    this.elementos.modal = document.getElementById('modalEliminar');
    this.elementos.btnConfirmar = document.getElementById('btnConfirmar');
    this.elementos.btnCancelar = document.getElementById('btnCancelar');
    this.elementos.mensajeDiv = document.getElementById('mensaje');
    this.elementos.indicadorCarga = document.getElementById('indicadorCarga');

    console.log('UI inicializada correctamente');
  },

  /**
   * Limpiar formulario
   */
  limpiarFormulario() {
    this.elementos.formulario.reset();
    this.elementos.nombre.focus();
  },

  /**
   * Obtener valores del formulario
   */
  obtenerDatosFormulario() {
    return {
      nombre: this.elementos.nombre.value.trim(),
      email: this.elementos.email.value.trim().toLowerCase(),
      edad: this.elementos.edad.value
    };
  },

  /**
   * Mostrar mensaje
   */
  mostrarMensaje(mensaje, tipo = 'exito') {
    const element = this.elementos.mensajeDiv;
    element.textContent = mensaje;
    element.className = `mensaje ${tipo}`;
    element.style.display = 'block';

    setTimeout(() => {
      element.style.display = 'none';
    }, 5000);
  },

  /**
   * Mostrar/ocultar indicador de carga
   */
  mostrarCarga(mostrar = true) {
    this.elementos.indicadorCarga.style.display = mostrar ? 'block' : 'none';
  },

  /**
   * Renderizar tabla de usuarios
   */
  renderizarTabla(usuarios) {
    this.elementos.tbody.innerHTML = '';

    if (!usuarios || usuarios.length === 0) {
      this.elementos.tbody.innerHTML = '<tr><td colspan="5">No hay usuarios registrados</td></tr>';
      return;
    }

    usuarios.forEach(usuario => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td>${usuario.edad}</td>
        <td>
          <button class="btn-editar" data-id="${usuario.id}">Editar</button>
          <button class="btn-eliminar" data-id="${usuario.id}">Eliminar</button>
        </td>
      `;
      this.elementos.tbody.appendChild(fila);
    });
  },

  /**
   * Mostrar modal de confirmación
   */
  mostrarModalEliminar(usuarioId) {
    this.elementos.modal.style.display = 'block';
    return usuarioId; // Se retorna para pasar al controlador
  },

  /**
   * Ocultar modal
   */
  ocultarModal() {
    this.elementos.modal.style.display = 'none';
  },

  /**
   * Habilitar/deshabilitar formulario
   */
  habilitarFormulario(habilitar = true) {
    this.elementos.formulario.querySelector('button').disabled = !habilitar;
    this.elementos.nombre.disabled = !habilitar;
    this.elementos.email.disabled = !habilitar;
    this.elementos.edad.disabled = !habilitar;
  },

  /**
   * Marcar campo con error
   */
  marcarError(campo, error = false) {
    if (error) {
      this.elementos[campo].classList.add('error');
    } else {
      this.elementos[campo].classList.remove('error');
    }
  },

  /**
   * Limpiar errores de todos los campos
   */
  limpiarErrores() {
    ['nombre', 'email', 'edad'].forEach(campo => {
      this.marcarError(campo, false);
    });
  }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UI;
}
