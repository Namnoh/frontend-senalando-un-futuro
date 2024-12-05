// Define los gestos como un objeto que mapea claves a nombres completos
export const GESTURES: { [key: string]: string } = {
    "a": "A",
    "b": "B",
    "c": "C",
    "d": "D",
    "e": "E",
    "hola": "HOLA",
    "buenos_dias": "BUENOS DÍAS",
    "buenas_tardes": "BUENAS TARDES",
    "buenas_noches": "BUENAS NOCHES",
    "como_estas": "CÓMO ESTÁS",
    "bien": "BIEN",
    "mal": "MAL",
    "gracias": "GRACIAS",
    "tienes": "TIENES",
    "tengo": "TENGO",
    "perro": "PERRO",
    "gato": "GATO",
    "cerdo": "CERDO",
    "pez": "PEZ",
    "vaca": "VACA",
    "pollo": "POLLO",
    "blanco": "BLANCO",
    "negro": "NEGRO",
    "rojo": "ROJO",
    "azul": "AZUL"
};

// Constantes de configuración
export const MODEL_FRAMES = 30;
export const MIN_LENGTH_FRAMES = 15;
export const MARGIN_FRAME = 1;
export const DELAY_FRAMES = 3;
export const THRESHOLD = 0.75;

// Define el valor máximo de distancia aceptable
export const MAX_DISTANCE = 1;

// Umbrales para mensajes cualitativos
export const HIGH_ACCURACY = 84;
export const MEDIUM_ACCURACY = 70;