function Message({ texto, tipo }) {
  return (
    <div className={`mensaje mensaje-${tipo}`}>
      {tipo === 'success' && '✅ '}
      {tipo === 'error' && '❌ '}
      {texto}
    </div>
  );
}

export default Message;
