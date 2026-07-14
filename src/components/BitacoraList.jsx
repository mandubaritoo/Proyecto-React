function BitacoraList({ bitacoras, onEditar, onEliminar }) {
  return (
    <section className="seccion" id="lista-bitacoras">
      <div className="contenedor">
        <h2>Registros guardados</h2>
        <p>
          Aquí se muestran las bitácoras registradas. Puedes editar o eliminar
          cada una.
        </p>

        {bitacoras.length === 0 ? (
          <div className="tarjeta">
            <p>No hay bitácoras registradas todavía.</p>
          </div>
        ) : (
          <div className="lista-bitacoras">
            {bitacoras.map((bitacora) => (
              <article className="tarjeta bitacora-item" key={bitacora.id}>
                <h3>{bitacora.nickname}</h3>
                <p><strong>Fecha:</strong> {bitacora.fecha}</p>
                <p>{bitacora.comentario}</p>

                <div className="acciones-formulario">
                  <button
                    className="boton"
                    onClick={() => onEditar(bitacora)}
                  >
                    Editar
                  </button>

                  <button
                    className="boton-secundario boton-eliminar"
                    onClick={() => onEliminar(bitacora.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default BitacoraList;