import { useEffect, useState } from "react";

function BitacoraForm({ onGuardar, bitacoraEditando, onCancelarEdicion }) {
  const [formData, setFormData] = useState({
    fecha: "",
    nickname: "",
    comentario: "",
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (bitacoraEditando) {
      setFormData(bitacoraEditando);
    } else {
      setFormData({
        fecha: "",
        nickname: "",
        comentario: "",
      });
    }
  }, [bitacoraEditando]);

  function handleChange(evento) {
    const { name, value } = evento.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrores((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validarFormulario() {
    const nuevosErrores = {};

    if (!formData.fecha) {
      nuevosErrores.fecha = "La fecha de visita es obligatoria.";
    }

    if (!formData.nickname.trim()) {
      nuevosErrores.nickname = "El nickname es obligatorio.";
    } else if (formData.nickname.trim().length < 3) {
      nuevosErrores.nickname = "El nickname debe tener al menos 3 caracteres.";
    }

    if (!formData.comentario.trim()) {
      nuevosErrores.comentario = "El comentario es obligatorio.";
    } else if (formData.comentario.trim().length < 10) {
      nuevosErrores.comentario = "El comentario debe tener al menos 10 caracteres.";
    }

    return nuevosErrores;
  }

  function handleSubmit(evento) {
    evento.preventDefault();

    const nuevosErrores = validarFormulario();

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    onGuardar(formData);

    setFormData({
      fecha: "",
      nickname: "",
      comentario: "",
    });

    setErrores({});
  }

  return (
    <section className="seccion fondo-suave" id="bitacora">
      <div className="contenedor">
        <h2>Bitácora de visitas</h2>
        <p>
          Registra una visita indicando la fecha, el nickname y un comentario.
        </p>

        <form className="formulario-bitacora" onSubmit={handleSubmit}>
          <div className="campo-formulario">
            <label htmlFor="fecha">Fecha de visita</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
            />
            {errores.fecha && <p className="error-texto">{errores.fecha}</p>}
          </div>

          <div className="campo-formulario">
            <label htmlFor="nickname">Nickname</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Ejemplo: jose_dev"
            />
            {errores.nickname && (
              <p className="error-texto">{errores.nickname}</p>
            )}
          </div>

          <div className="campo-formulario">
            <label htmlFor="comentario">Comentario</label>
            <textarea
              id="comentario"
              name="comentario"
              rows="5"
              value={formData.comentario}
              onChange={handleChange}
              placeholder="Escribe un comentario sobre la visita"
            ></textarea>
            {errores.comentario && (
              <p className="error-texto">{errores.comentario}</p>
            )}
          </div>

          <div className="acciones-formulario">
            <button type="submit" className="boton">
              {bitacoraEditando ? "Actualizar bitácora" : "Guardar bitácora"}
            </button>

            {bitacoraEditando && (
              <button
                type="button"
                className="boton-secundario"
                onClick={onCancelarEdicion}
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default BitacoraForm;