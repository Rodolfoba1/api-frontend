/**
 * api.js - Módulo de comunicación con la API
 * Maneja todas las llamadas HTTP a la API
 */

const API_URL = 'http://localhost:3000/usuarios';
const TIMEOUT = 5000; // 5 segundos

/**
 * Utilidad: Fetch con timeout
 */
const fetchConTimeout = (url, options = {}, timeout = TIMEOUT) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout de la API')), timeout)
    )
  ]);
};

/**
 * Manejo de respuesta HTTP
 */
const procesarRespuesta = async (respuesta) => {
  if (!respuesta.ok) {
    const datos = await respuesta.json();
    const error = new Error(datos.mensaje || 'Error desconocido');
    error.status = respuesta.status;
    throw error;
  }
  return respuesta.json();
};

/**
 * Módulo API
 */
const API = {
  /**
   * Obtener todos los usuarios
   */
  async obtenerTodos() {
    try {
      const respuesta = await fetchConTimeout(API_URL, {
        method: 'GET'
      });
      return await procesarRespuesta(respuesta);
    } catch (error) {
      this.manejarError(error);
      throw error;
    }
  },

  /**
   * Obtener usuario por ID
   */
  async obtenerPorId(id) {
    try {
      const respuesta = await fetchConTimeout(`${API_URL}/${id}`, {
        method: 'GET'
      });
      return await procesarRespuesta(respuesta);
    } catch (error) {
      this.manejarError(error);
      throw error;
    }
  },

  /**
   * Crear nuevo usuario
   */
  async crearUsuario(datos) {
    try {
      const respuesta = await fetchConTimeout(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      return await procesarRespuesta(respuesta);
    } catch (error) {
      this.manejarError(error);
      throw error;
    }
  },

  /**
   * Actualizar usuario
   */
  async actualizarUsuario(id, datos) {
    try {
      const respuesta = await fetchConTimeout(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      return await procesarRespuesta(respuesta);
    } catch (error) {
      this.manejarError(error);
      throw error;
    }
  },

  /**
   * Eliminar usuario
   */
  async eliminarUsuario(id) {
    try {
      const respuesta = await fetchConTimeout(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      return await procesarRespuesta(respuesta);
    } catch (error) {
      this.manejarError(error);
      throw error;
    }
  },

  /**
   * Manejo de errores específico
   */
  manejarError(error) {
    console.error('Error API:', error);
    // Aquí se pueden loguear errores a un servicio remoto
  }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API;
}
