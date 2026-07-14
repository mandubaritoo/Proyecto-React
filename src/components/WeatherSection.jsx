import { useEffect, useState } from "react";

function WeatherSection() {
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-20.2208&longitude=-70.1431&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo obtener el clima.");
        }
        return response.json();
      })
      .then((data) => {
        setClima(data.current);
        setCargando(false);
      })
      .catch(() => {
        setError("No se pudo cargar la información climática.");
        setCargando(false);
      });
  }, []);

  return (
    <section className="seccion fondo-suave" id="clima">
      <div className="contenedor">
        <h2>Clima actual en Iquique</h2>
        <p>
          Esta sección consulta una API externa usando fetch para mostrar el
          estado actual del clima.
        </p>

        <div className="tarjeta tarjeta-api">
          {cargando && <p>Cargando clima...</p>}

          {error && <p className="mensaje-error">{error}</p>}

          {clima && !cargando && !error && (
            <div className="clima-grid">
              <div className="dato-clima">
                <h3>Temperatura</h3>
                <p>{clima.temperature_2m} °C</p>
              </div>

              <div className="dato-clima">
                <h3>Humedad</h3>
                <p>{clima.relative_humidity_2m} %</p>
              </div>

              <div className="dato-clima">
                <h3>Viento</h3>
                <p>{clima.wind_speed_10m} km/h</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default WeatherSection;