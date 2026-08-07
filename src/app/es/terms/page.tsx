import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import EsLegalPage from "../_views/LegalPage";

export const metadata: Metadata = { title: "Términos de servicio", description: "Términos de servicio de ZeroPlay Games.", alternates: buildAlternates("/terms", "es") };

export default function Page() {
  return <EsLegalPage title="Términos de servicio" intro="Al utilizar ZeroPlay Games aceptas estos términos generales de uso del sitio." sections={[
    { title: "Uso del sitio", body: ["Puedes utilizar el sitio y abrir los juegos disponibles para uso personal legítimo. No debes intentar interferir con el funcionamiento, la seguridad o la disponibilidad del servicio."] },
    { title: "Disponibilidad", body: ["Los juegos, páginas y funciones pueden cambiar, corregirse o retirarse. No garantizamos que una función concreta permanezca disponible de forma indefinida."] },
    { title: "Contenido de terceros", body: ["Algunos recursos, servicios de analítica o publicidad pueden proceder de terceros y estar sujetos a términos adicionales de sus respectivos proveedores."] },
    { title: "Limitación", body: ["El sitio se proporciona para entretenimiento e información general. Utiliza los juegos y servicios bajo tu propia responsabilidad y dentro de la legislación aplicable."] },
  ]} />;
}
