const textarea = document.querySelector("textarea"),
    btn = document.querySelector("button");
function textToSpeech(text) {
    let utternance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utternance);

}
btn.addEventListener("click", e => {
    e.preventDefault();

    if (textarea.value!=="") {
        textToSpeech(textarea.value);

    }
});