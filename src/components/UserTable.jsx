function UserTable({ usuarios, onEdit, onDelete }) {
  if (usuarios.length === 0) {
    return (
      <table id="tablaUsuarios" className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="cuerpoTabla">
          <tr className="sin-datos">
            <td colSpan="5">📭 No hay usuarios. Crea uno para empezar.</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table id="tablaUsuarios" className="tabla">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Edad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="cuerpoTabla">
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>
              <strong>{usuario.id}</strong>
            </td>
            <td>{usuario.nombre}</td>
            <td>{usuario.email}</td>
            <td>{usuario.edad}</td>
            <td>
              <div className="acciones">
                <button
                  className="btn btn-small btn-edit"
                  onClick={() => onEdit(usuario)}
                >
                  ✏️ Editar
                </button>
                <button
                  className="btn btn-small btn-delete"
                  onClick={() => onDelete(usuario)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
