import bannerImg from "../assets/banner.png";

function Hero({ saludo }) {
  return (
    <section className="hero" id="inicio">
      <div className="contenedor hero-contenido">
        <div className="hero-texto">
          <p className="etiqueta">
            {saludo}, soy estudiante de Analista Programador
          </p>
          <h2>Bienvenido a mi landing page en React</h2>
          <p>
            Soy estudiante de Analista Programador en INACAP. Esta aplicación
            será la evolución de mi landing page anterior, ahora construida en
            React para mostrar información útil, validaciones y manejo de datos.
          </p>
          <a href="#proyecto" className="boton">
            Ver proyecto
          </a>
        </div>

        <div className="hero-imagen">
          <div className="hero-placeholder">
            <img
              src={bannerImg}
              alt="Vista principal del proyecto"
              className="hero-imagen-foto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
