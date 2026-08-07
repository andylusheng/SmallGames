import type { Metadata } from "next";
import { buildAlternates } from "@/lib/metadata";
import EsLegalPage from "../_views/LegalPage";

export const metadata: Metadata = { title: "DMCA", description: "Información sobre avisos DMCA y derechos de autor en ZeroPlay Games.", alternates: buildAlternates("/dmca", "es") };

export default function Page() {
  return <EsLegalPage title="DMCA y derechos de autor" intro="ZeroPlay Games respeta los derechos de propiedad intelectual y revisa los avisos válidos relacionados con contenido alojado o enlazado desde el sitio." sections={[
    { title: "Enviar un aviso", body: ["Un aviso debe identificar claramente la obra protegida, el material presuntamente infractor, la ubicación concreta del contenido y una forma válida de contacto."] },
    { title: "Declaración", body: ["Incluye una declaración de buena fe y confirma que la información aportada es correcta y que estás autorizado para actuar en nombre del titular de los derechos."] },
    { title: "Revisión", body: ["Los avisos completos pueden revisarse y dar lugar a la retirada o modificación del material cuando corresponda."] },
  ]} />;
}
