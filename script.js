const textarea = document.querySelector("textarea"),
    voiceList = document.querySelector("select"),
    btn = document.querySelector("button");
let synth = speechSynthesis,
    isSpeaking = true;

function voices() {
    for (let voice of synth.getVoices()) {
        let selected = voice.name === "Google US English" ? "selected" : "";
        console.log(voice);
        let option = `<option value="${voice.name}" ${selected} >${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}
synth.addEventListener("voiceschanged", voices);
function textToSpeech(text) {
    let utternance = new SpeechSynthesisUtterance(text);
    
    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            utternance.voice = voice;
            console.log("hi")
        }
    }
    synth.speak(utternance);
}
btn.addEventListener("click", e => {
    e.preventDefault();
    if (textarea.value !== "") {
        if (!synth.speaking) {
            textToSpeech(textarea.value);

        }
        if (textarea.value.length > 80) {
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                btn.innerText = "pause speech"
            } else {

                synth.pause();
                isSpeaking = true;
                btn.innerText = "Resume speech"

            }
            setInterval(() =>{
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    btn.innerText = "Convert To Speech";
                }
            });


        }
       else {
            btn.innerText = "Convert To Speech";
        }
    }

});