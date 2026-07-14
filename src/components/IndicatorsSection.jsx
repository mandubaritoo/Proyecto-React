import { useEffect, useState } from "react";
import axios from "axios";

function IndicatorsSection() {
  const [indicadores, setIndicadores] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function obtenerIndicadores() {
      try {
        const [ufRes, utmRes, dolarRes, euroRes] = await Promise.all([
          axios.get("https://mindicador.cl/api/uf"),
          axios.get("https://mindicador.cl/api/utm"),
          axios.get("https://mindicador.cl/api/dolar"),
          axios.get("https://mindicador.cl/api/euro"),
        ]);

        setIndicadores({
          uf: ufRes.data.serie[0].valor,
          utm: utmRes.data.serie[0].valor,
          dolar: dolarRes.data.serie[0].valor,
          euro: euroRes.data.serie[0].valor,
        });
      } catch (error) {
        setError("No se pudieron cargar los indicadores económicos.");
      } finally {
        setCargando(false);
      }
    }

    obtenerIndicadores();
  }, []);

  function formatearPesos(valor) {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 2,
    }).format(valor);
  }

  return (
    <section className="seccion" id="indicadores">
      <div className="contenedor">
        <h2>Indicadores económicos de Chile</h2>
        <p>
          Esta sección consulta datos externos con axios para mostrar valores
          actualizados de referencia económica.
        </p>

        <div className="tarjeta tarjeta-api">
          {cargando && <p>Cargando indicadores...</p>}

          {error && <p className="mensaje-error">{error}</p>}

          {indicadores && !cargando && !error && (
            <div className="clima-grid">
              <div className="dato-clima">
                <h3>UF</h3>
                <p>{formatearPesos(indicadores.uf)}</p>
              </div>

              <div className="dato-clima">
                <h3>UTM</h3>
                <p>{formatearPesos(indicadores.utm)}</p>
              </div>

              <div className="dato-clima">
                <h3>Dólar</h3>
                <p>{formatearPesos(indicadores.dolar)}</p>
              </div>

              <div className="dato-clima">
                <h3>Euro</h3>
                <p>{formatearPesos(indicadores.euro)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default IndicatorsSection;