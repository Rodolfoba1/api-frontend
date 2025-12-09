import { useState, useEffect } from 'react';

function UserForm({ onSubmit, editingUser, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    edad: '',
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        nombre: editingUser.nombre,
        email: editingUser.email,
        edad: editingUser.edad,
      });
    } else {
      setFormData({
        nombre: '',
        email: '',
        edad: '',
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    setFormData({
      nombre: '',
      email: '',
      edad: '',
    });
    onCancel();
  };

  return (
    <div className="form-container">
      <h2>{editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
      <form id="formulario" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            placeholder="Ej: Juan Pérez"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Ej: juan@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="edad">Edad:</label>
          <input
            type="number"
            id="edad"
            placeholder="Ej: 30"
            min="1"
            max="120"
            value={formData.edad}
            onChange={handleChange}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" id="btnGuardar" className="btn btn-primary">
            💾 {editingUser ? 'Actualizar' : 'Guardar'} Usuario
          </button>
          {editingUser && (
            <button
              type="button"
              id="btnCancelar"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              ❌ Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default UserForm;
