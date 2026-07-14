import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import WeatherSection from "./components/WeatherSection";
import IndicatorsSection from "./components/IndicatorsSection";
import BitacoraForm from "./components/BitacoraForm";
import BitacoraList from "./components/BitacoraList";

function App() {
  const [temaOscuro, setTemaOscuro] = useState(true);
  const [saludo, setSaludo] = useState("");
  const [bitacoraEditando, setBitacoraEditando] = useState(null);
  const [mensajeExito, setMensajeExito] = useState("");

  const [bitacoras, setBitacoras] = useState(() => {
    const datosGuardados = localStorage.getItem("bitacoras");
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  useEffect(() => {
    const horaActual = new Date().getHours();

    if (horaActual < 12) {
      setSaludo("Buenos días");
    } else if (horaActual < 19) {
      setSaludo("Buenas tardes");
    } else {
      setSaludo("Buenas noches");
    }
  }, []);

  useEffect(() => {
    if (temaOscuro) {
      document.body.classList.add("tema-oscuro");
      document.body.classList.remove("tema-claro");
    } else {
      document.body.classList.add("tema-claro");
      document.body.classList.remove("tema-oscuro");
    }
  }, [temaOscuro]);

  useEffect(() => {
    localStorage.setItem("bitacoras", JSON.stringify(bitacoras));
  }, [bitacoras]);

  useEffect(() => {
    if (!mensajeExito) return;

    const temporizador = setTimeout(() => {
      setMensajeExito("");
    }, 3000);

    return () => clearTimeout(temporizador);
  }, [mensajeExito]);

  function cambiarTema() {
    setTemaOscuro(!temaOscuro);
  }

  function guardarBitacora(datos) {
    if (bitacoraEditando) {
      const actualizadas = bitacoras.map((bitacora) =>
        bitacora.id === bitacoraEditando.id
          ? { ...datos, id: bitacoraEditando.id }
          : bitacora
      );

      setBitacoras(actualizadas);
      setBitacoraEditando(null);
      setMensajeExito("La bitácora fue actualizada correctamente.");
      return;
    }

    const nuevaBitacora = {
      ...datos,
      id: Date.now(),
    };

    setBitacoras([...bitacoras, nuevaBitacora]);
    setMensajeExito("La bitácora fue guardada correctamente.");
  }

  function editarBitacora(bitacora) {
    setBitacoraEditando(bitacora);
  }

  function eliminarBitacora(id) {
    const filtradas = bitacoras.filter((bitacora) => bitacora.id !== id);
    setBitacoras(filtradas);

    if (bitacoraEditando && bitacoraEditando.id === id) {
      setBitacoraEditando(null);
    }

    setMensajeExito("La bitácora fue eliminada correctamente.");
  }

  function cancelarEdicion() {
    setBitacoraEditando(null);
  }

  return (
    <>
      <Header temaOscuro={temaOscuro} cambiarTema={cambiarTema} />

      <main>
        <section className="seccion">
          <div className="contenedor">
            <img
              src="/public/banner.jpg"
              alt="Banner clima indicadores Iquique"
              className="app-banner"
            />
          </div>
        </section>

        <Hero saludo={saludo} />
        <WeatherSection />
        <IndicatorsSection />

        {mensajeExito && (
          <div className="contenedor">
            <p className="mensaje-exito">{mensajeExito}</p>
          </div>
        )}

        <BitacoraForm
          onGuardar={guardarBitacora}
          bitacoraEditando={bitacoraEditando}
          onCancelarEdicion={cancelarEdicion}
        />

        <BitacoraList
          bitacoras={bitacoras}
          onEditar={editarBitacora}
          onEliminar={eliminarBitacora}
        />

        <section className="seccion fondo-suave" id="sobre-mi">
          <div className="contenedor">
            <h2>Sobre mí</h2>
            <p>
              Actualmente estoy aprendiendo desarrollo web con HTML, CSS,
              JavaScript, React, Python y bases de datos como MySQL y MongoDB.
              Mi objetivo es seguir mejorando este portafolio con nuevos
              proyectos y más funcionalidades.
            </p>
          </div>
        </section>

        <section className="seccion" id="proyecto">
          <div className="contenedor">
            <h2>Proyecto actual</h2>
            <p>
              En esta nueva versión integré clima actual de Iquique,
              indicadores económicos de Chile y una bitácora con operaciones
              CRUD usando React y LocalStorage.
            </p>

            <div className="tarjetas">
              <article className="tarjeta">
                <h3>Clima en Iquique</h3>
                <p>
                  Sección que muestra el clima actual usando una API con fetch.
                </p>
              </article>

              <article className="tarjeta">
                <h3>Indicadores económicos</h3>
                <p>
                  Sección que muestra UF, UTM, dólar y euro usando axios.
                </p>
              </article>

              <article className="tarjeta">
                <h3>Bitácora de visitas</h3>
                <p>
                  Sección para registrar, editar y eliminar bitácoras con
                  validación y persistencia en LocalStorage.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
