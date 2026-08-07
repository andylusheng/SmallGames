import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import EsLegalPage from "../_views/LegalPage";

export const metadata: Metadata = { title: "Política de privacidad", description: "Política de privacidad de ZeroPlay Games.", alternates: buildAlternates("/privacy", "es") };

export default function Page() {
  return <EsLegalPage title="Política de privacidad" intro="Esta política describe de forma general cómo ZeroPlay Games trata la información asociada al uso del sitio." sections={[
    { title: "Datos de uso", body: ["Podemos utilizar herramientas de analítica para medir visitas, páginas consultadas y eventos de interacción con los juegos. Estos datos ayudan a detectar errores y mejorar la experiencia."] },
    { title: "Cookies y publicidad", body: ["El sitio puede utilizar cookies o tecnologías similares para funciones de analítica y publicidad. Los proveedores externos pueden aplicar sus propias políticas de privacidad."] },
    { title: "Cuentas y descargas", body: ["No necesitas crear una cuenta ni descargar una aplicación para empezar a jugar a los títulos disponibles en ZeroPlay Games."] },
    { title: "Cambios", body: ["Podemos actualizar esta política cuando cambien las funciones del sitio, los proveedores utilizados o los requisitos aplicables."] },
  ]} />;
}
