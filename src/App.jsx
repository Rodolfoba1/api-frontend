import { useState, useEffect } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import Message from './components/Message';
import Statistics from './components/Statistics';

const API_URL = 'http://localhost:3000/usuarios';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Cargar usuarios al iniciar
  useEffect(() => {
    cargarUsuarios();
  }, []);

  /**
   * Cargar todos los usuarios desde la API
   */
  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const respuesta = await fetch(API_URL);

      if (!respuesta.ok) {
        throw new Error('Error al cargar usuarios');
      }

      const datos = await respuesta.json();

      if (datos.exito) {
        setUsuarios(datos.datos);
      } else {
        mostrarMensaje('Error: ' + datos.mensaje, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      mostrarMensaje('Error al conectar con la API: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Mostrar mensaje temporal
   */
  const mostrarMensaje = (texto, tipo = 'success') => {
    setMessage({ texto, tipo });
    setTimeout(() => setMessage(null), 4000);
  };

  /**
   * Manejar guardado de usuario
   */
  const manejarGuardar = async (datosUsuario) => {
    const nombre = datosUsuario.nombre.trim();
    const email = datosUsuario.email.trim();
    const edad = parseInt(datosUsuario.edad);

    // Validaciones
    if (!nombre || !email || !edad) {
      mostrarMensaje('Por favor completa todos los campos', 'error');
      return;
    }

    if (edad < 1 || edad > 120) {
      mostrarMensaje('La edad debe estar entre 1 y 120', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      mostrarMensaje('Email inválido', 'error');
      return;
    }

    try {
      let respuesta;
      const userData = { nombre, email, edad };

      if (editingUser) {
        // Actualizar usuario
        respuesta = await fetch(`${API_URL}/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
      } else {
        // Crear nuevo usuario
        respuesta = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
      }

      const datos = await respuesta.json();

      if (datos.exito) {
        mostrarMensaje(
          editingUser ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente',
          'success'
        );
        setEditingUser(null);
        cargarUsuarios();
      } else {
        mostrarMensaje('Error: ' + datos.mensaje, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      mostrarMensaje('Error al guardar usuario: ' + error.message, 'error');
    }
  };

  /**
   * Editar usuario
   */
  const editarUsuario = (usuario) => {
    setEditingUser(usuario);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Cancelar edición
   */
  const cancelarEdicion = () => {
    setEditingUser(null);
  };

  /**
   * Abrir confirmación de eliminación
   */
  const abrirConfirmacion = (usuario) => {
    setDeleteConfirm(usuario);
  };

  /**
   * Confirmar eliminación
   */
  const confirmarEliminar = async () => {
    if (!deleteConfirm) return;

    try {
      const respuesta = await fetch(`${API_URL}/${deleteConfirm.id}`, {
        method: 'DELETE',
      });

      const datos = await respuesta.json();

      if (datos.exito) {
        mostrarMensaje('Usuario eliminado correctamente', 'success');
        cargarUsuarios();
      } else {
        mostrarMensaje('Error: ' + datos.mensaje, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      mostrarMensaje('Error al eliminar usuario: ' + error.message, 'error');
    } finally {
      setDeleteConfirm(null);
    }
  };

  /**
   * Cancelar eliminación
   */
  const cancelarEliminar = () => {
    setDeleteConfirm(null);
  };

  return (
    <div className="container">
      <header>
        <h1>👥 Gestión de Usuarios</h1>
        <p className="subtitle">API CRUD - Administrar usuarios</p>
      </header>

      {message && (
        <Message
          texto={message.texto}
          tipo={message.tipo}
        />
      )}

      <UserForm
        onSubmit={manejarGuardar}
        editingUser={editingUser}
        onCancel={cancelarEdicion}
      />

      <div className="table-container">
        <div className="table-header">
          <h2>Lista de Usuarios</h2>
          <button
            className="btn btn-refresh"
            onClick={cargarUsuarios}
            disabled={loading}
          >
            🔄 Refrescar
          </button>
        </div>

        {loading && (
          <div className="loading">
            <p>⏳ Cargando usuarios...</p>
          </div>
        )}

        {!loading && (
          <UserTable
            usuarios={usuarios}
            onEdit={editarUsuario}
            onDelete={abrirConfirmacion}
          />
        )}
      </div>

      <Statistics totalUsuarios={usuarios.length} />

      {deleteConfirm && (
        <div className="modal-overlay" onClick={cancelarEliminar}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>⚠️ Confirmar eliminación</h3>
            <p>¿Deseas eliminar a <strong>{deleteConfirm.nombre}</strong>? Esta acción no se puede deshacer.</p>
            <div className="modal-buttons">
              <button
                className="btn btn-secondary"
                onClick={cancelarEliminar}
              >
                ❌ Cancelar
              </button>
              <button
                className="btn btn-danger"
                onClick={confirmarEliminar}
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
