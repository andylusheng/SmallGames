import type { GameSeoProfile, LocalizedGameSeoContent } from "@/data/game-profiles";

export interface EsGameContext {
  slug: string;
  title: string;
  category: string;
}

export const ES_CATEGORY_LABELS: Record<string, string> = {
  action: "acción",
  arcade: "arcade",
  casual: "juegos casuales",
  idle: "juegos idle",
  puzzle: "puzles",
  racing: "carreras",
  shooting: "disparos",
  sports: "deportes",
  strategy: "estrategia",
};

export const ES_TOPIC_LABELS: Record<string, string> = {
  tap: "Juegos de tocar y hacer clic",
  merge: "Juegos de combinar",
  defense: "Juegos de defensa",
  memory: "Juegos de memoria",
  reaction: "Juegos de reflejos",
  number: "Juegos de números",
  word: "Juegos de palabras",
  classic: "Juegos clásicos",
  idle: "Juegos idle y clicker",
};

const CONTROL_LABELS: Record<string, string> = {
  mouse: "ratón",
  touch: "pantalla táctil",
  keyboard: "teclado",
};

const CATEGORY_TIPS: Record<string, string[]> = {
  action: [
    "Prioriza movimientos precisos antes que acciones rápidas sin control.",
    "Observa el patrón de la partida y evita repetir el mismo error en intentos consecutivos.",
  ],
  arcade: [
    "Busca un ritmo constante: en los juegos arcade suele ser más útil mantener el control que precipitarse.",
    "Usa las primeras partidas para reconocer cómo aumenta la dificultad y cuándo conviene asumir riesgos.",
  ],
  casual: [
    "Aprende primero la interacción principal y después intenta optimizar tu puntuación o progreso.",
    "Si una partida sale mal, reinicia y cambia una sola decisión cada vez para identificar qué funciona mejor.",
  ],
  idle: [
    "Compara el coste de cada mejora con el beneficio que aporta antes de gastar recursos.",
    "Cuando existan varias fuentes de progreso, evita invertir todo en una sola sin comprobar su rendimiento.",
  ],
  puzzle: [
    "Antes de mover una pieza, revisa qué opciones puede bloquear ese movimiento más adelante.",
    "Si te atascas, vuelve a observar el estado completo del tablero en lugar de repetir la misma secuencia.",
  ],
  racing: [
    "Haz correcciones pequeñas y controladas; los cambios bruscos suelen ser más difíciles de recuperar.",
    "Fíjate en el espacio que queda por delante y prepara el siguiente movimiento antes de llegar al obstáculo.",
  ],
  shooting: [
    "Combina puntería con posicionamiento: sobrevivir suele ser tan importante como acertar objetivos.",
    "Evita movimientos innecesarios mientras apuntas para mantener una referencia visual más estable.",
  ],
  sports: [
    "Practica primero el momento exacto de la acción principal antes de intentar maximizar la puntuación.",
    "Repite lanzamientos o golpes con pequeñas variaciones para entender cómo responde el juego.",
  ],
  strategy: [
    "Piensa una jugada por adelantado y conserva recursos para responder a cambios inesperados.",
    "Compara varias opciones antes de comprometer una posición o gastar un recurso importante.",
  ],
};

const SPECIAL_FACTS: Record<string, string> = {
  tangram: "La versión actual de Tangram no detecta automáticamente si la figura está resuelta; el botón Next Puzzle avanza manualmente al siguiente puzle.",
  "sand-fall": "Sand Fall es un sandbox de partículas abierto: no tiene puntuación, condición de victoria ni Game Over.",
  "pipe-connect": "En Pipe Connect, la conexión válida se comprueba desde la esquina superior izquierda hasta la casilla inferior derecha; no se afirma que todos los tableros aleatorios tengan solución.",
  "bubble-cannon": "La versión actual de Bubble Cannon no implementa un Game Over real y no elimina grupos flotantes por perder la conexión con la parte superior.",
  bowling: "Bowling utiliza un sistema simplificado de bolos derribados acumulados y no aplica la puntuación oficial de strikes y spares.",
  "boat-race": "Boat Race es una carrera individual de distancia y esquiva de obstáculos; la versión actual no incluye barcos rivales.",
  "asteroid-dodge": "Asteroid Dodge es un juego de esquiva; la versión actual no incluye disparos.",
  "subway-dash": "Subway Dash utiliza cambios entre tres carriles; la versión actual no incluye salto ni deslizamiento.",
  "chess-puzzle": "Chess Puzzle usa ocho respuestas fijas de origen y destino; no es un motor completo de ajedrez.",
  gomoku: "La versión actual de Gomoku no define de forma explícita un empate automático cuando el tablero se llena.",
};

function categoryLabel(category: string) {
  return ES_CATEGORY_LABELS[category] ?? "navegador";
}

function controlsText(profile: GameSeoProfile) {
  const controls = profile.mechanics.controls.map((control) => CONTROL_LABELS[control] ?? control);
  return controls.length ? controls.join(", ") : "los controles indicados en pantalla";
}

function durationText(profile: GameSeoProfile) {
  return profile.mechanics.durationSeconds
    ? `Cada ronda tiene una duración definida de ${profile.mechanics.durationSeconds} segundos.`
    : "La duración depende de cómo avance la partida y de su condición de finalización.";
}

function scoreText(profile: GameSeoProfile) {
  const count = profile.mechanics.scoring.length;
  if (!count) return "La versión actual no necesita una tabla de puntuación para explicar su bucle principal.";
  return `La versión actual contiene ${count} ${count === 1 ? "regla" : "reglas"} de puntuación o recompensa verificadas en el perfil del juego.`;
}

function topicText(profile: GameSeoProfile) {
  const formal = profile.mechanics.gameplayTopics.find((topic) => ES_TOPIC_LABELS[topic]);
  return formal ? ES_TOPIC_LABELS[formal] : null;
}

export function buildEsGameContent(profile: GameSeoProfile, game: EsGameContext): LocalizedGameSeoContent {
  const category = categoryLabel(game.category);
  const controls = controlsText(profile);
  const topic = topicText(profile);
  const specialFact = SPECIAL_FACTS[game.slug];
  const categoryTips = CATEGORY_TIPS[game.category] ?? CATEGORY_TIPS.casual;
  const duration = durationText(profile);
  const scoring = scoreText(profile);

  const metaTitle = `Jugar a ${game.title} gratis online – ${category}`;
  const metaDescription = `Juega a ${game.title} gratis en tu navegador. Consulta controles, reglas y consejos verificados${profile.mechanics.durationSeconds ? ` para partidas de ${profile.mechanics.durationSeconds} segundos` : ""}, sin descargar.`;
  const h1 = `${game.title} – juego online gratis de ${category}`;
  const intro = `${game.title} se puede jugar gratis directamente en el navegador, sin instalar una aplicación. Esta guía resume la versión disponible del juego, sus controles (${controls}) y las reglas que conviene conocer antes de empezar.`;

  const about = [
    `${game.title} forma parte de la colección de ${category} de ZeroPlay Games${topic ? ` y también está relacionado con ${topic.toLowerCase()}` : ""}. La página mantiene el juego y la guía en una sola URL para que puedas empezar una partida y consultar después controles, reglas y consejos sin cambiar de sitio.`,
    `${duration} ${scoring} Los datos de esta guía se apoyan en la mecánica registrada para la versión actual del juego y no añaden funciones que el runtime no tenga.`,
    ...(specialFact ? [specialFact] : []),
  ];

  const howToPlay = [
    `Pulsa Jugar para abrir ${game.title} en el navegador.`,
    `Usa ${controls} según los controles disponibles en esta versión.`,
    `Completa el objetivo mostrado por el propio juego y presta atención a los cambios de puntuación, progreso o estado de la ronda.`,
    profile.mechanics.durationSeconds
      ? `Aprovecha los ${profile.mechanics.durationSeconds} segundos de la ronda y revisa el resultado cuando el contador llegue al final.`
      : "Continúa hasta que se active la condición de finalización de la partida o decidas reiniciar.",
  ];

  const rules = [
    `Los controles verificados para esta versión son: ${controls}.`,
    duration,
    scoring,
    profile.mechanics.endCondition
      ? "La partida dispone de una condición de finalización definida en la mecánica actual; no se sustituye por reglas de otros juegos con un nombre parecido."
      : "No se añade una condición de finalización que la versión actual del juego no tenga.",
    ...(specialFact ? [specialFact] : []),
  ];

  const tips = [
    ...categoryTips,
    profile.mechanics.controls.includes("touch")
      ? "En móvil, toca de forma breve y precisa para evitar gestos accidentales del navegador."
      : "Si necesitas controles de teclado o ratón, usa un navegador de escritorio para tener acceso a todas las entradas disponibles.",
  ];

  const faq = [
    {
      q: `¿Cómo se juega a ${game.title}?`,
      a: `Abre el juego, usa ${controls} y sigue el objetivo mostrado en la versión actual. Esta página reúne además reglas y consejos sin inventar mecánicas que no estén disponibles.`,
    },
    {
      q: `¿${game.title} es gratis?`,
      a: `Sí. Puedes iniciar ${game.title} gratis desde el navegador. ZeroPlay Games puede mostrar publicidad, pero no necesitas descargar una aplicación ni crear una cuenta para empezar.`,
    },
    {
      q: `¿Puedo jugar a ${game.title} en móvil?`,
      a: profile.mechanics.controls.includes("touch")
        ? `La versión actual incluye entrada táctil entre sus controles verificados. El comportamiento concreto puede variar según el navegador y el dispositivo.`
        : `Puedes abrir la página desde un móvil, pero esta versión no tiene el control táctil marcado como verificado. Para jugar con todos los controles disponibles, usa teclado o ratón cuando corresponda.`,
    },
    {
      q: `¿Hay que descargar ${game.title}?`,
      a: `No. ${game.title} se ejecuta como juego HTML5 en el navegador y no requiere instalar una aplicación.`,
    },
    ...(specialFact ? [{ q: `¿Qué debo saber sobre esta versión de ${game.title}?`, a: specialFact }] : []),
  ];

  return { metaTitle, metaDescription, h1, intro, about, howToPlay, rules, tips, faq };
}

export function buildEsFallbackSeo(profile: GameSeoProfile | undefined, game: EsGameContext) {
  if (!profile) {
    const category = categoryLabel(game.category);
    return {
      metaTitle: `Jugar a ${game.title} gratis online`,
      metaDescription: `Juega a ${game.title} gratis en tu navegador, sin descargar ni registrarte.`,
      h1: `${game.title} – juego online gratis`,
      intro: `${game.title} es un juego de ${category} que puedes abrir directamente en el navegador.`,
    };
  }
  const content = buildEsGameContent(profile, game);
  return {
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription,
    h1: content.h1,
    intro: content.intro,
  };
}
