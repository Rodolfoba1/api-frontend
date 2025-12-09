/**
 * validaciones.js - Módulo de validaciones del frontend
 * Valida datos antes de enviar a la API
 */

const VALIDACIONES = {
  /**
   * Validar nombre
   */
  validarNombre(nombre) {
    if (!nombre || typeof nombre !== 'string') {
      return { valido: false, error: 'El nombre es requerido' };
    }
    nombre = nombre.trim();
    if (nombre.length < 3) {
      return { valido: false, error: 'El nombre debe tener al menos 3 caracteres' };
    }
    if (nombre.length > 100) {
      return { valido: false, error: 'El nombre no puede exceder 100 caracteres' };
    }
    return { valido: true };
  },

  /**
   * Validar email
   */
  validarEmail(email) {
    if (!email || typeof email !== 'string') {
      return { valido: false, error: 'El email es requerido' };
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.trim())) {
      return { valido: false, error: 'El formato del email no es válido' };
    }
    return { valido: true };
  },

  /**
   * Validar edad
   */
  validarEdad(edad) {
    if (edad === '' || edad === null || edad === undefined) {
      return { valido: false, error: 'La edad es requerida' };
    }
    const edadNum = parseInt(edad, 10);
    if (isNaN(edadNum)) {
      return { valido: false, error: 'La edad debe ser un número' };
    }
    if (edadNum < 18) {
      return { valido: false, error: 'Debes ser mayor de 18 años' };
    }
    if (edadNum > 120) {
      return { valido: false, error: 'La edad no puede ser mayor a 120 años' };
    }
    return { valido: true };
  },

  /**
   * Validar formulario completo
   */
  validarFormulario(datos) {
    const validarNombreResult = this.validarNombre(datos.nombre);
    if (!validarNombreResult.valido) {
      return validarNombreResult;
    }

    const validarEmailResult = this.validarEmail(datos.email);
    if (!validarEmailResult.valido) {
      return validarEmailResult;
    }

    const validarEdadResult = this.validarEdad(datos.edad);
    if (!validarEdadResult.valido) {
      return validarEdadResult;
    }

    return { valido: true };
  }
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VALIDACIONES;
}
