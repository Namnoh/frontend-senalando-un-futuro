export function textToSpeech(text: string) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'es-ES' // Ajusta esto según el idioma de tu aplicación
    window.speechSynthesis.speak(utterance)
}