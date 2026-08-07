import type { CategorySeoLocale } from "@/data/category-seo";

const categorySeoEs: Record<string, CategorySeoLocale> = {
  action: {
    hook: "¿Buscas partidas rápidas y directas? Los juegos de acción de ZeroPlay reúnen reflejos, movimiento, esquiva y combate en sesiones que empiezan al instante desde el navegador.",
    intro: [
      "Los juegos de acción ponen el foco en responder a lo que ocurre en pantalla. Según el título, eso puede significar moverte, esquivar, atacar o mantener una posición mientras aumenta la dificultad.",
      "No todos los juegos de acción usan las mismas reglas. Por eso cada página individual explica los controles, la puntuación y la condición de finalización de la versión disponible.",
      "Puedes abrir los juegos directamente en el navegador sin instalar una aplicación ni crear una cuenta para empezar.",
    ],
    benefits: [
      { icon: "zap", title: "Respuesta rápida", desc: "Partidas centradas en timing, movimiento y decisiones inmediatas." },
      { icon: "target", title: "Precisión", desc: "Mejora al entender patrones y reducir movimientos innecesarios." },
      { icon: "gamepad", title: "Controles directos", desc: "Cada juego indica sus controles disponibles y verificados." },
      { icon: "flame", title: "Sesiones intensas", desc: "Entra en una partida sin procesos de instalación." },
    ],
    why: ["Juegos gratuitos en el navegador", "Sin descarga para empezar", "Páginas individuales con reglas y controles", "Colección de mecánicas variadas"],
    faq: [
      { q: "¿Los juegos de acción son gratis?", a: "Sí. Los juegos de esta categoría se pueden iniciar gratis desde el navegador." },
      { q: "¿Funcionan en móvil?", a: "Depende de los controles de cada título. Consulta la página individual para comprobar si la entrada táctil está verificada." },
      { q: "¿Tengo que descargar algo?", a: "No. Los juegos se ejecutan como experiencias HTML5 en el navegador." },
    ],
  },
  arcade: {
    hook: "Partidas cortas, reglas fáciles de reconocer y el clásico impulso de intentarlo una vez más: aquí encontrarás juegos arcade que puedes abrir al instante.",
    intro: [
      "Los juegos arcade suelen construir el reto alrededor de una acción principal y una dificultad que aumenta con el tiempo, la velocidad o la puntuación.",
      "La colección incluye distintas mecánicas, desde esquiva y rebotes hasta bloques, objetivos y retos de habilidad. Cada juego mantiene su propia guía para evitar mezclar reglas de títulos diferentes.",
      "Todo se abre directamente en el navegador, sin instalación previa.",
    ],
    benefits: [
      { icon: "trophy", title: "Retos de puntuación", desc: "Muchos títulos permiten perseguir una mejor marca partida tras partida." },
      { icon: "clock", title: "Partidas rápidas", desc: "Mecánicas fáciles de empezar y adecuadas para sesiones cortas." },
      { icon: "repeat", title: "Rejugabilidad", desc: "Aprende el patrón, mejora la precisión y vuelve a intentarlo." },
      { icon: "gamepad", title: "Juego inmediato", desc: "Abre el título y empieza desde el navegador." },
    ],
    why: ["Sin descargas", "Variedad de mecánicas arcade", "Reglas específicas por juego", "Acceso gratuito desde el navegador"],
    faq: [
      { q: "¿Qué es un juego arcade?", a: "Suele ser un juego de reglas directas, respuesta rápida y partidas orientadas a habilidad, supervivencia o puntuación." },
      { q: "¿Se pueden jugar gratis?", a: "Sí. Los juegos arcade de ZeroPlay se pueden iniciar gratis." },
      { q: "¿Necesito registrarme?", a: "No necesitas una cuenta para empezar a jugar." },
    ],
  },
  casual: {
    hook: "Si quieres algo sencillo de empezar y fácil de retomar, los juegos casuales ofrecen mecánicas directas sin exigir una sesión larga.",
    intro: [
      "Los juegos casuales priorizan una entrada rápida: una regla principal clara, controles sencillos y partidas que puedes entender en poco tiempo.",
      "Eso no significa que todos sean iguales. Algunos se basan en precisión, otros en progresión, organización o pequeñas decisiones repetidas.",
      "ZeroPlay mantiene una guía individual para cada título para que puedas consultar qué hace realmente la versión disponible.",
    ],
    benefits: [
      { icon: "smile", title: "Fáciles de empezar", desc: "Mecánicas accesibles para entrar en una partida rápidamente." },
      { icon: "clock", title: "Sesiones flexibles", desc: "Útiles tanto para una partida corta como para varios intentos." },
      { icon: "hand", title: "Interacción sencilla", desc: "Muchos títulos usan pocos controles y acciones claras." },
      { icon: "sparkles", title: "Variedad", desc: "Puzles ligeros, timing, progresión y otros estilos casuales." },
    ],
    why: ["Acceso inmediato", "Sin instalación", "Mecánicas variadas", "Guías de juego específicas"],
    faq: [
      { q: "¿Qué significa juego casual?", a: "Es una categoría amplia para juegos fáciles de empezar y que no requieren una sesión larga para entender su mecánica principal." },
      { q: "¿Son gratis?", a: "Sí. Puedes iniciar los juegos casuales gratis desde el navegador." },
      { q: "¿Puedo jugar en móvil?", a: "Algunos títulos incluyen control táctil. Comprueba los controles verificados en la página de cada juego." },
    ],
  },
  idle: {
    hook: "Haz crecer recursos, compra mejoras y decide dónde invertir: los juegos idle y de progresión convierten pequeñas decisiones en crecimiento acumulado.",
    intro: [
      "Los juegos idle suelen comenzar con una fuente básica de recursos y después añaden mejoras, producción automática o nuevas capas de progresión.",
      "La parte estratégica consiste en comparar costes y beneficios. No todas las mejoras rinden igual, y la mejor compra depende del estado actual de la partida.",
      "El progreso offline o el guardado no se da por supuesto: cada página explica únicamente lo que la versión actual implementa.",
    ],
    benefits: [
      { icon: "trending-up", title: "Progresión visible", desc: "Observa cómo aumentan recursos, producción o niveles." },
      { icon: "coins", title: "Decisiones de inversión", desc: "Compara mejoras antes de gastar recursos." },
      { icon: "wrench", title: "Optimización", desc: "Ajusta tu ruta de mejoras según el rendimiento real." },
      { icon: "repeat", title: "Crecimiento continuo", desc: "Vuelve a la partida y sigue desarrollando el sistema." },
    ],
    why: ["Juegos gratuitos", "Sin descargas", "Información conservadora sobre guardado y progreso", "Varias formas de producción y mejora"],
    faq: [
      { q: "¿Qué es un juego idle?", a: "Es un juego de progresión donde los recursos y las mejoras tienen un papel central y parte de la producción puede automatizarse." },
      { q: "¿El juego progresa con la pestaña cerrada?", a: "Depende del título. ZeroPlay solo lo indica cuando esa función existe en la versión actual." },
      { q: "¿Hay que instalarlo?", a: "No. Los juegos se ejecutan en el navegador." },
    ],
  },
  puzzle: {
    hook: "Puzles de lógica, patrones, números y espacio para cuando quieres pensar antes de actuar. Elige un reto y empieza directamente en el navegador.",
    intro: [
      "Los juegos de puzles convierten cada movimiento en una decisión. El objetivo puede ser ordenar piezas, conectar elementos, completar una cuadrícula o encontrar una solución con recursos limitados.",
      "La mejor estrategia depende de la mecánica concreta. Algunos puzles permiten pensar sin presión y otros añaden tiempo, puntuación o restricciones adicionales.",
      "Cada juego tiene su propia página con reglas verificadas para la implementación disponible.",
    ],
    benefits: [
      { icon: "brain", title: "Lógica", desc: "Analiza el estado del tablero antes de comprometer una jugada." },
      { icon: "layers", title: "Planificación", desc: "Piensa cómo un movimiento afecta a las opciones posteriores." },
      { icon: "target", title: "Objetivos claros", desc: "Cada título explica qué condición debes alcanzar." },
      { icon: "clock", title: "Ritmo variable", desc: "Desde retos pausados hasta puzles con presión de tiempo." },
    ],
    why: ["Puzles gratuitos", "Sin instalación", "Reglas por juego", "Variedad de lógica, números, memoria y espacio"],
    faq: [
      { q: "¿Qué tipos de puzles hay?", a: "La colección incluye lógica, números, memoria, combinación, conexión y otros retos basados en tablero." },
      { q: "¿Son gratuitos?", a: "Sí. Puedes empezar gratis en el navegador." },
      { q: "¿Se guarda siempre el progreso?", a: "No se asume. La página de cada juego indica las funciones de progreso verificadas para su versión." },
    ],
  },
  racing: {
    hook: "Velocidad, carriles, obstáculos y control: los juegos de carreras reúnen retos donde anticipar el siguiente movimiento importa tanto como reaccionar rápido.",
    intro: [
      "En los juegos de carreras la mecánica puede centrarse en distancia, esquiva, trazada o puntuación. No todos incluyen rivales ni usan un modelo de competición tradicional.",
      "Por eso ZeroPlay describe la implementación concreta de cada título en lugar de asumir reglas por su nombre.",
      "Puedes abrir las carreras directamente desde el navegador sin descargar una aplicación.",
    ],
    benefits: [
      { icon: "gauge", title: "Control de velocidad", desc: "Aprende cómo cambia la respuesta del juego a medida que avanza la partida." },
      { icon: "navigation", title: "Anticipación", desc: "Lee el espacio que queda por delante antes de cambiar de dirección." },
      { icon: "flag", title: "Objetivos variados", desc: "Distancia, supervivencia, tiempo o puntuación según el título." },
      { icon: "zap", title: "Respuesta rápida", desc: "Corrige con precisión cuando aparecen nuevos obstáculos." },
    ],
    why: ["Carreras gratuitas", "Sin descarga", "Objetivos descritos según el runtime real", "Controles indicados por juego"],
    faq: [
      { q: "¿Todos los juegos de carreras tienen rivales?", a: "No. Algunos son retos individuales de distancia, carriles u obstáculos. Consulta la página del juego para ver su estructura real." },
      { q: "¿Puedo jugar gratis?", a: "Sí. Los juegos de carreras se pueden iniciar gratis." },
      { q: "¿Funcionan en móvil?", a: "Depende de los controles del título. La página individual indica si la entrada táctil está verificada." },
    ],
  },
  shooting: {
    hook: "Apunta, controla tu posición y responde a los objetivos que aparecen en pantalla con juegos de disparos que se ejecutan directamente en el navegador.",
    intro: [
      "Los juegos de disparos pueden centrarse en puntería, supervivencia, movimiento o eliminación de objetivos. La importancia de cada elemento cambia según el título.",
      "ZeroPlay evita atribuir funciones por el nombre: si un juego no dispara realmente, no se describe como shooter dentro de su guía individual.",
      "Las páginas de juego recogen controles y reglas de la versión disponible.",
    ],
    benefits: [
      { icon: "target", title: "Puntería", desc: "Ajusta tus movimientos para mantener una referencia estable." },
      { icon: "shield", title: "Posicionamiento", desc: "Evitar daño o amenazas puede ser tan importante como atacar." },
      { icon: "zap", title: "Reflejos", desc: "Responde cuando el escenario o los objetivos cambian." },
      { icon: "gamepad", title: "Controles verificados", desc: "Consulta ratón, teclado o entrada táctil por título." },
    ],
    why: ["Juegos gratuitos", "Sin instalación", "Descripción basada en la versión real", "Guías de controles y reglas"],
    faq: [
      { q: "¿Todos los títulos de esta categoría usan los mismos controles?", a: "No. Comprueba la página individual para ver las entradas disponibles." },
      { q: "¿Hay que descargar un cliente?", a: "No. Los juegos se ejecutan en el navegador." },
      { q: "¿Son gratis?", a: "Sí. Puedes iniciar los títulos de esta categoría gratis." },
    ],
  },
  sports: {
    hook: "Timing, trayectoria, precisión y puntuación: entra en juegos deportivos de navegador sin necesidad de instalar nada.",
    intro: [
      "Los juegos deportivos de ZeroPlay simplifican distintas disciplinas en mecánicas de habilidad adaptadas al navegador.",
      "La puntuación puede diferir de las reglas oficiales del deporte real. Cuando existe una simplificación, la guía individual describe lo que hace realmente el juego.",
      "Esto permite comparar títulos sin confundir una implementación ligera con un simulador completo.",
    ],
    benefits: [
      { icon: "medal", title: "Retos de habilidad", desc: "Mejora timing, dirección o precisión según la disciplina." },
      { icon: "target", title: "Puntuación", desc: "Consulta cómo suma puntos cada versión antes de competir contra tu marca." },
      { icon: "activity", title: "Mecánicas variadas", desc: "Lanzamientos, golpes, rebotes y otros retos deportivos." },
      { icon: "gamepad", title: "Juego en navegador", desc: "Empieza sin instalar una aplicación." },
    ],
    why: ["Acceso gratuito", "Sin descargas", "Sistemas de puntuación explicados por juego", "Diferentes disciplinas"],
    faq: [
      { q: "¿La puntuación sigue siempre las reglas oficiales?", a: "No. Algunas versiones usan sistemas simplificados. La página de cada juego explica la puntuación implementada." },
      { q: "¿Puedo jugar en el navegador?", a: "Sí. Los títulos de esta categoría se ejecutan directamente en el navegador." },
      { q: "¿Necesito una cuenta?", a: "No necesitas registrarte para iniciar una partida." },
    ],
  },
  strategy: {
    hook: "Colocación, recursos y decisiones con consecuencias: los juegos de estrategia premian pensar antes de actuar.",
    intro: [
      "Los juegos de estrategia reúnen mecánicas donde una decisión modifica las opciones posteriores. Puede tratarse de defender una ruta, gestionar recursos o resolver una posición de tablero.",
      "No todos necesitan partidas largas. Algunos son retos tácticos breves y otros desarrollan sistemas de progresión durante más tiempo.",
      "Cada página individual mantiene las reglas y limitaciones de la implementación actual.",
    ],
    benefits: [
      { icon: "brain", title: "Planificación", desc: "Valora el siguiente paso antes de gastar o mover." },
      { icon: "coins", title: "Gestión de recursos", desc: "Invierte donde el beneficio sea más útil para tu situación." },
      { icon: "git-branch", title: "Opciones", desc: "Compara varias rutas antes de comprometer una decisión." },
      { icon: "shield", title: "Adaptación", desc: "Cambia de plan cuando el estado de la partida lo exija." },
    ],
    why: ["Juegos gratuitos", "Sin instalación", "Mecánicas tácticas variadas", "Reglas verificadas por título"],
    faq: [
      { q: "¿Qué tipos de estrategia incluye ZeroPlay?", a: "Hay defensa, gestión, juegos de tablero y otros retos tácticos dentro de la categoría." },
      { q: "¿Son gratis?", a: "Sí. Puedes empezar a jugar gratis desde el navegador." },
      { q: "¿Todos tienen inteligencia artificial?", a: "No. Solo se indica un oponente o sistema automático cuando existe en la implementación concreta." },
    ],
  },
};

export function getEsCategorySeo(slug: string): CategorySeoLocale | null {
  return categorySeoEs[slug] ?? null;
}
