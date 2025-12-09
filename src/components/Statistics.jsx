function Statistics({ totalUsuarios }) {
  return (
    <div className="estadisticas">
      <div className="stat-card">
        <span className="stat-label">Total Usuarios</span>
        <span className="stat-value">{totalUsuarios}</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Estado</span>
        <span className="stat-value">✅ Activo</span>
      </div>
    </div>
  );
}

export default Statistics;
