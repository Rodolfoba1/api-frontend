/**
 * controlador.js - Módulo controlador principal
 * Orquesta la interacción entre API, UI y Validaciones
 */

class Controlador {
  constructor() {
    this.usuarioEnEdicion = null;
    this.usuarioParaEliminar = null;
  }

  /**
   * Inicializar la aplicación
   */
  async inicializar() {
    UI.inicializar();
    this.cargarUsuarios();
    this.configurarEventos();
    console.log('Aplicación inicializada');
  }

  /**
   * Configurar escuchadores de eventos
   */
  configurarEventos() {
    // Formulario
    UI.elementos.formulario.addEventListener('submit', (e) => this.manejarGuardar(e));

    // Botones de tabla
    UI.elementos.tabla.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-editar')) {
        const id = parseInt(e.target.getAttribute('data-id'), 10);
        this.manejarEditar(id);
      }
      if (e.target.classList.contains('btn-eliminar')) {
        const id = parseInt(e.target.getAttribute('data-id'), 10);
        this.manejarEliminarClick(id);
      }
    });

    // Modal
    UI.elementos.btnConfirmar.addEventListener('click', () => this.manejarEliminarConfirmado());
    UI.elementos.btnCancelar.addEventListener('click', () => UI.ocultarModal());
  }

  /**
   * Cargar usuarios de la API
   */
  async cargarUsuarios() {
    try {
      UI.mostrarCarga(true);
      const resultado = await API.obtenerTodos();
      
      if (resultado.exito) {
        UI.renderizarTabla(resultado.datos);
      } else {
        UI.mostrarMensaje(resultado.mensaje, 'error');
      }
    } catch (error) {
      UI.mostrarMensaje('Error al cargar usuarios: ' + error.message, 'error');
    } finally {
      UI.mostrarCarga(false);
    }
  }

  /**
   * Manejar envío de formulario
   */
  async manejarGuardar(e) {
    e.preventDefault();
    
    const datos = UI.obtenerDatosFormulario();
    
    // Validar
    const validacion = VALIDACIONES.validarFormulario(datos);
    if (!validacion.valido) {
      UI.mostrarMensaje(validacion.error, 'error');
      return;
    }

    try {
      UI.habilitarFormulario(false);
      UI.mostrarCarga(true);

      let resultado;
      if (this.usuarioEnEdicion) {
        // Actualizar
        resultado = await API.actualizarUsuario(this.usuarioEnEdicion, datos);
      } else {
        // Crear
        resultado = await API.crearUsuario(datos);
      }

      if (resultado.exito) {
        UI.mostrarMensaje(
          this.usuarioEnEdicion ? 'Usuario actualizado' : 'Usuario creado',
          'exito'
        );
        UI.limpiarFormulario();
        UI.limpiarErrores();
        this.usuarioEnEdicion = null;
        await this.cargarUsuarios();
      } else {
        UI.mostrarMensaje(resultado.mensaje, 'error');
      }
    } catch (error) {
      UI.mostrarMensaje('Error: ' + error.message, 'error');
    } finally {
      UI.habilitarFormulario(true);
      UI.mostrarCarga(false);
    }
  }

  /**
   * Manejar edición
   */
  async manejarEditar(id) {
    try {
      const resultado = await API.obtenerPorId(id);
      
      if (resultado.exito) {
        const usuario = resultado.datos;
        UI.elementos.nombre.value = usuario.nombre;
        UI.elementos.email.value = usuario.email;
        UI.elementos.edad.value = usuario.edad;
        this.usuarioEnEdicion = usuario.id;
        UI.elementos.nombre.focus();
      } else {
        UI.mostrarMensaje(resultado.mensaje, 'error');
      }
    } catch (error) {
      UI.mostrarMensaje('Error al cargar usuario: ' + error.message, 'error');
    }
  }

  /**
   * Manejar clic en eliminar
   */
  manejarEliminarClick(id) {
    this.usuarioParaEliminar = id;
    UI.mostrarModalEliminar(id);
  }

  /**
   * Manejar confirmación de eliminación
   */
  async manejarEliminarConfirmado() {
    if (!this.usuarioParaEliminar) return;

    try {
      UI.habilitarFormulario(false);
      UI.mostrarCarga(true);
      
      const resultado = await API.eliminarUsuario(this.usuarioParaEliminar);
      
      if (resultado.exito) {
        UI.mostrarMensaje('Usuario eliminado correctamente', 'exito');
        this.usuarioParaEliminar = null;
        UI.ocultarModal();
        await this.cargarUsuarios();
      } else {
        UI.mostrarMensaje(resultado.mensaje, 'error');
      }
    } catch (error) {
      UI.mostrarMensaje('Error al eliminar: ' + error.message, 'error');
    } finally {
      UI.habilitarFormulario(true);
      UI.mostrarCarga(false);
    }
  }
}

// Crear instancia global del controlador
const controlador = new Controlador();

// Inicializar cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
  controlador.inicializar();
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Controlador;
}
