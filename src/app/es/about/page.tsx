import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import EsLegalPage from "../_views/LegalPage";

export const metadata: Metadata = { title: "Acerca de ZeroPlay Games", description: "Información sobre ZeroPlay Games y su catálogo de juegos online gratis.", alternates: buildAlternates("/about", "es") };

export default function Page() {
  return <EsLegalPage title="Acerca de ZeroPlay Games" intro="ZeroPlay Games es un sitio de juegos HTML5 gratuitos que puedes abrir directamente en el navegador." sections={[
    { title: "Qué ofrecemos", body: ["El catálogo actual reúne 100 juegos con páginas individuales, categorías y colecciones por mecánica de juego.", "Nuestro objetivo es que la entrada al juego aparezca antes del contenido largo y que las guías describan la versión real disponible."] },
    { title: "Contenido y controles", body: ["Las páginas explican controles, reglas, puntuación y condiciones de finalización cuando estos datos están verificados. La compatibilidad móvil puede variar por juego y navegador."] },
    { title: "Contacto", body: ["Para avisos legales, errores de contenido o consultas relacionadas con el sitio, utiliza los canales de contacto indicados por ZeroPlay Games."] },
  ]} />;
}
