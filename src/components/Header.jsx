function Header({ temaOscuro, cambiarTema }) {
  return (
    <header className="header">
      <div className="contenedor encabezado">
        <h1 className="logo">Portafolio de José Luis</h1>

        <nav>
          <ul className="menu">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#sobre-mi">Sobre mí</a></li>
            <li><a href="#proyecto">Proyecto</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>

        <button className="boton-tema" onClick={cambiarTema}>
          {temaOscuro ? "Modo claro" : "Modo oscuro"}
        </button>
      </div>
    </header>
  );
}

export default Header;